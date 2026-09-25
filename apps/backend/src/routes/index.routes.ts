import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.json({
    message: "Control Parental API funcionando",
  });
});

export default router;