import "dotenv/config";
import express from "express";
import { PDFDocument } from "pdf-lib";
import { prisma } from "./lib/prisma";
import { uploadPdf } from "./services/r2.service";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend works 🚀");
});

app.get("/api/health", (req, res) => {
  res.json({ ok: true, message: "Backend works 🚀" });
});

app.get("/books", async (req, res) => {
  const books = await prisma.book.findMany();
  res.json(books);
});

app.post("/books/test", async (req, res) => {
  const book = await prisma.book.create({
    data: { status: "pending", params: {} },
  });
  res.status(201).json(book);
});

app.post("/generate-test-pdf", async (req, res) => {
  const doc = await PDFDocument.create();
  for (let i = 1; i <= 16; i++) {
    const page = doc.addPage();
    page.drawText(`Test page ${i}`, { x: 50, y: 800, size: 12 });
  }
  const pdfBytes = await doc.save();
  const buffer = Buffer.from(pdfBytes);
  const key = `test-${Date.now()}.pdf`;
  await uploadPdf(key, buffer);
  console.log("Uploaded to R2:", key);
  res.json({ ok: true, key });
});

app.use((req, res) => {
  res.status(404).send("Backend: route not found");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
