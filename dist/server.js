"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const pdf_lib_1 = require("pdf-lib");
const prisma_1 = require("./lib/prisma");
const r2_service_1 = require("./services/r2.service");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Backend works 🚀");
});
app.get("/api/health", (req, res) => {
    res.json({ ok: true, message: "Backend works 🚀" });
});
app.get("/books", async (req, res) => {
    const books = await prisma_1.prisma.book.findMany();
    res.json(books);
});
app.post("/books/test", async (req, res) => {
    const book = await prisma_1.prisma.book.create({
        data: { status: "pending", params: {} },
    });
    res.status(201).json(book);
});
app.post("/generate-test-pdf", async (req, res) => {
    const doc = await pdf_lib_1.PDFDocument.create();
    for (let i = 1; i <= 16; i++) {
        const page = doc.addPage();
        page.drawText(`Test page ${i}`, { x: 50, y: 800, size: 12 });
    }
    const pdfBytes = await doc.save();
    const buffer = Buffer.from(pdfBytes);
    const key = `test-${Date.now()}.pdf`;
    await (0, r2_service_1.uploadPdf)(key, buffer);
    res.json({ ok: true, file: key });
});
app.use((req, res) => {
    res.status(404).send("Backend: route not found");
});
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
//# sourceMappingURL=server.js.map