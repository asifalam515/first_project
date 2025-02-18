// schema and model will be here
import { Schema, model, connect } from "mongoose";
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  StudentMethods,
  StudentModel,
  TUserName,
} from "./student.interface";
import validator from "validator";

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    require: [true, "first name is required"],
    trim: true,
    maxlength: [20, "max allowed length is 20 char"],
    validate: {
      validator: function (value: string) {
        // console.log(value); we will get firstName's value
        const firstNameStr =
          value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        return firstNameStr === value;
      },
      message: "{VALUE} is not in capitialize format",
    },
  },
  middleName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: "{VALUE} is not valid",
    },
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: String,
  fatherOccupation: String,
  fatherContactNo: String,
  motherName: String,
  motherOccupation: String,
  motherContactNo: String,
});
const localGuardianSchema = new Schema<TLocalGuardian>({
  name: String,
  occupation: String,
  contactNo: String,
  address: String,
});
const studentSchema = new Schema<TStudent, StudentModel, StudentMethods>({
  id: { type: String, required: true, unique: true },
  name: {
    type: userNameSchema,
    required: [true, "name is required"],
  },
  gender: {
    type: String,
    enum: {
      values: ["Male", "Female", "other"],
      message: `{VALUE} is not valid options`,
    },
    required: true,
  },
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
  bloodGroup: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: {
    type: guardianSchema,
    required: [true, "gurdian is required"],
  },
  localGuardian: {
    type: localGuardianSchema,
    required: [true, "local gurdian is required"],
  },

  profileImg: String,
  isActive: {
    type: String,
    enum: ["ACTIVE", "BLOCKED"],
    default: "ACTIVE",
  },
});

studentSchema.methods.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id: id });
  return existingUser;
};
export const Student = model<TStudent, StudentModel>("Student", studentSchema);
