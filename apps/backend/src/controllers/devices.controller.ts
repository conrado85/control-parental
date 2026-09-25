import { Request, Response } from "express";

export const getDevices = (req: Request, res: Response) => {
  res.json({
    message: "Listado de  dispositivos",
  });
};

export const createDevice = (req: Request, res: Response) => {
  const { name } = req.body;

  if (!name || typeof name !== "string") {
    res.status(400).json({
      message: "El nombre del dispositivo es obligatorio",
    });
    return;
  }

  res.status(201).json({
    message: "Dispositivo creado",
    name,
  });
};