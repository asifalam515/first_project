import { Application, Request, Response } from "express";
import cors from "cors";
import { StudentRoutes } from "./app/modules/student/student.route";
const express = require("express");
const app: Application = express();
const port = 3000;
app.use(express.json());
app.use(cors());
app.get("/", (req: Request, res: Response) => {
  res.send("hello world");
});
// application routes
app.use("/api/v1/students", StudentRoutes);
// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });
export default app;
