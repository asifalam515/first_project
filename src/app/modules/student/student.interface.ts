import { Model } from "mongoose";

export type UserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type Guardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type LocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type Student = {
  id: string;
  name: UserName;
  gender: "Male" | "Female" | "Other";
  dateOfBirth?: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  presentAddress: string;
  permanentAddress: string; // Fixed typo here
  guardian: Guardian; // Fixed typo here
  localGuardian: LocalGuardian; // Fixed typo here
  profileImg?: string;
  isActive: "ACTIVE" | "BLOCKED";
};
//
export type StudentMethods = {
  isUserExists(id: string): Promise<Student>;
};
type StudentModel = Model<Student, {}, StudentMethods>;
