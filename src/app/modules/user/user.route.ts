import { userControllers } from "./user.controller";

var express = require("express");
var router = express.Router();
router.post("/create-student", userControllers.createStudent);
