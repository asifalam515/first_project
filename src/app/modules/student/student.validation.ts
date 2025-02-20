import { z } from "zod";

// Guardian schema
const guardianValidationSchema = z.object({
  fatherName: z.string(),
  fatherOccupation: z.string(),
  fatherContactNo: z.string(),
  motherName: z.string(),
  motherOccupation: z.string(),
  motherContactNo: z.string(),
});

// Local Guardian schema
const localGurdianValidationSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  contactNo: z.string(),
  address: z.string(),
});

// UserName schema
const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1, "first name is required")
    .max(20, "max allowed length is 20 char")
    .refine((value) => {
      const firstNameStr =
        value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
      return firstNameStr === value;
    }, "{VALUE} is not in capitalize format"),
  middleName: z.string(),
  lastName: z
    .string()
    .min(1, "last name is required")
    .refine((value) => /^[A-Za-z]+$/.test(value), "{VALUE} is not valid"),
});

// Main Student schema
export const studentValidationSchema = z.object({
  id: z.string().min(1, "ID is required"),
  password: z.string().max(20),
  name: userNameValidationSchema,
  gender: z.enum(["Male", "Female", "Other"]),
  dateOfBirth: z.string().optional(),
  email: z.string().email("Invalid email format"),
  contactNo: z.string().min(1, "Contact number is required"),
  emergencyContactNo: z.string(),
  bloodGroup: z
    .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
    .optional(),
  presentAddress: z.string().min(1, "Present address is required"),
  permanentAddress: z.string().min(1, "Permanent address is required"),
  guardian: guardianValidationSchema,
  localGuardian: localGurdianValidationSchema,
  profileImg: z.string().optional(),
  isActive: z.enum(["ACTIVE", "BLOCKED"]).default("ACTIVE"),
});

export default studentValidationSchema;
