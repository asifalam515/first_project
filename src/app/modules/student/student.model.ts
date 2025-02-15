// schema and model will be here
import { Schema, model, connect } from "mongoose";
import {
  Guardian,
  localGurdian,
  Student,
  Student,
  UserName,
} from "./student.interface";
// import {
//   Guardian,
//   localGurdian,
//   Student,
//   UserName,
// } from "./student/student.interface";

const userNameSchema = new Schema<UserName>({
  firstName: {
    type: String,
    require: true,
  },
  middleName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
});

const guardianSchema = new Schema<Guardian>({
  fatherName: String,
  fatherOccupation: String,
  fatherContactNo: String,
  motherName: String,
  motherOccupation: String,
  motherContactNo: String,
});
const localGurdianSchema = new Schema<localGurdian>({
  name: String,
  occupation: String,
  contactNo: String,
  address: String,
});
const studentSchema = new Schema<Student>({
  id: { type: String },
  name: userNameSchema,
  gender: ["Male", "Female"],
  dateOfBirth: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  emergencyContactNo: {
    type: String,
  },
  bloodGroup: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  presentAddress: { type: String, required: true },
  pernamentAddress: { type: String, required: true },
  gurdian: guardianSchema,
  localGurdian: localGurdianSchema,

  profileImg: String,
  isActive: ["ACTIVE", "BLOCKED"],
});
const Student = model<Student>("Student", studentSchema);
