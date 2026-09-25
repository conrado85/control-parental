import express from "express";
import indexRoutes from "./routes/index.routes";
import devicesRoutes from "./routes/devices.routes";

const app = express();

app.use(express.json());

app.use("/", indexRoutes);
app.use("/devices", devicesRoutes);


export default app;