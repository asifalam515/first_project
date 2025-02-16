import { Request, Response } from "express";
import { StudentServices } from "./student.service";

const createStudent = async (req: Request, res: Response) => {
  try {
    const student = req.body;

    // will call service funciton to send this data
    const result = await StudentServices.createStudentIntoDB(student);
    // send response
    res.status(200).json({
      success: true,
      message: "Student is Created Successfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const StudentControllers = {
  createStudent,
};
