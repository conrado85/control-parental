export type CreateDeviceInput = {
  name: string;
  platform: "android";
};

export type Device = {
  id: string;
  name: string;
  platform: "android";
  status: "active" | "inactive";
  createdAt: Date;
};