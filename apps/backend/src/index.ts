import express from "express";

const app = express();

const PORT = 3000;

app.get("/", (_req, res) => {
  res.json({
    message: "Backend funcionando correctamente",
  });
});

app.listen(PORT, () => {
  console.log(`Backend ejecutándose en http://localhost:${PORT}`);
});