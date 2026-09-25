import { Router } from "express";
import {
  getDevices,
  createDevice,
} from "../controllers/devices.controller";

const router = Router();

router.get("/", getDevices);
router.post("/", createDevice);

export default router;