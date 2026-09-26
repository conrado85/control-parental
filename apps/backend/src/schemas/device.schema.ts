import { z } from "zod";

export const createDeviceSchema = z.object({
  name: z.string().min(1),
});