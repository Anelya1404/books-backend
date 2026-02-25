import express from "express";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend works 🚀");
});

app.get("/api/health", (req, res) => {
  res.json({ ok: true, message: "Backend works 🚀" });
});

app.use((req, res) => {
  res.status(404).send("Backend: route not found");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
