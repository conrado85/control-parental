export const createDeviceService = (name: string) => {
  return {
    id: Date.now(),
    name,
  };
};