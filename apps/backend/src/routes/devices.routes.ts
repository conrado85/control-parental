import { Router } from "express";
import {
  getDevices,
  createDevice,
} from "../controllers/devices.controller";
import { validate } from "../middleware/validate";
import { createDeviceSchema } from "../schemas/device.schema";

const router = Router();

router.get("/", getDevices);

router.post("/",
  validate(createDeviceSchema),
   createDevice
  );

export default router;