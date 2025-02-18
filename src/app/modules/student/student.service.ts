import { TStudent } from "./student.interface";
import { Student } from "../student/student.model";

const createStudentIntoDB = async (studentData: TStudent) => {
  // const result = await StudentModel.create(studentData); //built in static method
  // we can use instance method also
  const student = new Student(studentData); //create and instance
  if (await student.isUserExists(studentData.id)) {
    throw new Error("User already exists");
  }
  const result = await student.save(); //built in instance method

  return result;
};
const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};
const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id: id });
  return result;
};
export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
};
