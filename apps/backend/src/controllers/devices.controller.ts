import { Request, Response } from "express";
import { createDeviceService } from "../services/devices.service";



export const getDevices = (req: Request, res: Response) => {
  res.json({
    message: "Listado de  dispositivos",
  });
};

export const createDevice = (req: Request, res: Response) => {
  const { name } = req.body;

  const device = createDeviceService(name);

  res.status(201).json({
    message: "Dispositivo creado",
    device,
  });
};