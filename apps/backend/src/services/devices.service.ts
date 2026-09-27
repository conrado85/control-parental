import { prisma } from "../prisma";

export const createDeviceService = async (name: string) => {
  return await prisma.device.create({
    data: {
      name,
      platform: "android",
    },
  });
};

export const getDevicesService = async () => {
  return await prisma.device.findMany();
};