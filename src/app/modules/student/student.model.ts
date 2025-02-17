// schema and model will be here
import { Schema, model, connect } from "mongoose";
import { Guardian, localGurdian, Student, UserName } from "./student.interface";
import validator from "validator";

const userNameSchema = new Schema<UserName>({
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
  pernamentAddress: { type: String, required: true },
  gurdian: {
    type: guardianSchema,
    required: [true, "gurdian is required"],
  },
  localGurdian: {
    type: localGurdianSchema,
    required: [true, "local gurdian is required"],
  },

  profileImg: String,
  isActive: {
    type: String,
    enum: ["ACTIVE", "BLOCKED"],
    default: "ACTIVE",
  },
});
export const StudentModel = model<Student>("Student", studentSchema);
