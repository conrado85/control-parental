import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.json({
    message: "Listado de dispositivos",
  });
});

export default router;