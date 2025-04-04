// schema and model will be here
import { Schema, model, connect } from "mongoose";
import bcrypt from "bcrypt";
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
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
const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: { type: String, required: true, unique: true },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "user id must have "],
      unique: true,
      ref: "User",
    },
    password: {
      type: String,
      required: [true, "Password is Required"],

      maxlength: [20, "Password can't be more than 20 chararcters"],
    },
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

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// virtual
studentSchema.virtual("fullName").get(function () {
  return this.name.firstName + this.name.middleName + this.name.middleName;
});
// pre save middleware/hook:will work on create() save()
studentSchema.pre("save", async function (next) {
  const user = this;
  // hasing password and save into db
  user.password = await bcrypt.hash(
    user.password,
    Number(process.env.BCRYPT_SALT_ROUNDS)
  );
  next();
});

// post save middleware/hook
studentSchema.post("save", function (doc, next) {
  //doc is the document after the save
  //after save the password will be empty string
  doc.password = "";

  next();
});
// query middleware

// Query Middleware
studentSchema.pre("find", function (next) {
  //we will get current query
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre("findOne", function (next) {
  //we will get current query
  this.find({ isDeleted: { $ne: true } });
  next();
});
studentSchema.pre("aggregate", function (next) {
  //we will get current query
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});
// creating a custom static method
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id: id });
  return existingUser;
};

// creatring a custom instance method
// studentSchema.methods.isUserExists = async function (id: string) {
//   const existingUser = await Student.findOne({ id: id });
//   return existingUser;
// };
export const Student = model<TStudent, StudentModel>("Student", studentSchema);
