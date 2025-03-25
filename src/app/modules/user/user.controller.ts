import { UserServices } from "./user.service";
import express, { Request, Response } from "express";

const createStudent = async (req: Request, res: Response) => {
  try {
    // const student = req.body.student;
    const { password, student: studentData } = req.body;
    // data validation using zod
    // const zodparseData = studentValidationSchema.parse(studentData);
    // will call service funciton to send this data
    const result = await UserServices.createStudentIntoDB(
      password,
      studentData
    );

    // send response
    res.status(200).json({
      success: true,
      message: "Student is Created Successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "something went wrong",
    });
  }
};
export const userControllers = {
  createStudent,
};
