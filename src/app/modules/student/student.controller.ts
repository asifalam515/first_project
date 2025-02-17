import { Request, Response } from "express";
import { StudentServices } from "./student.service";
import studentValidationSchema from "./student.validation";

const createStudent = async (req: Request, res: Response) => {
  try {
    // const student = req.body.student;
    const { student: studentData } = req.body;
    const { error, value } = studentValidationSchema.validate(studentData);
    console.log(error, value);
    if (error) {
      res.status(500).json({
        success: false,
        message: "something went wrong",
        error: error,
      });
    }
    // will call service funciton to send this data
    const result = await StudentServices.createStudentIntoDB(studentData);
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
const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: "Students are retrived successfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};
const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: "Single Student is retrived successfully",
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};
export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
};
