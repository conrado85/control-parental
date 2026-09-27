import { Request, Response } from "express";
import {
  createDeviceService,
  getDevicesService,
} from "../services/devices.service";



export const getDevices = async (req: Request, res: Response) => {
  const devices = await getDevicesService();

  res.json({
    message: "Listado de dispositivos",
    devices,
  });
};

export const createDevice = async (req: Request, res: Response) => {
  const { name } = req.body;

  const device = await createDeviceService(name);

  res.status(201).json({
    message: "Dispositivo creado",
    device,
  });
};