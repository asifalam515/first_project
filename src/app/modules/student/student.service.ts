import { Student } from "./student.interface";
import { StudentModel } from "../student/student.model";

const createStudentIntoDB = async (studentData: Student) => {
  // const result = await StudentModel.create(studentData); //built in static method
  // we can use instance method also
  const student = new StudentModel(studentData);
  const result = await student.save(); //built in instance method

  return result;
};
const getAllStudentsFromDB = async () => {
  const result = await StudentModel.find();
  return result;
};
const getSingleStudentFromDB = async (id: string) => {
  const result = await StudentModel.findOne({ id: id });
  return result;
};
export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
};
