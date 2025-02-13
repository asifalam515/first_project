"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());
app.use((0, cors_1.default)());
app.get("/", (req, res) => {
    var a = 10;
    res.send(a);
});
// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });
exports.default = app;
