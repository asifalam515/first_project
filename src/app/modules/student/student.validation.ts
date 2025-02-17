import Joi, { valid } from "joi";
import { join } from "path";
const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .required()
    .trim()
    .max(20)
    .pattern(/^[A-Z][a-z]*$/, "capitalize first letter")
    .messages({
      "string.base": '"firstName" should be a string',
      "string.empty": '"firstName" is required',
      "string.max": '"firstName" should not exceed 20 characters',
      "string.pattern.base": '"firstName" should be in capitalize format',
    }),
  middleName: Joi.string().required().messages({
    "string.base": '"middleName" should be a string',
    "string.empty": '"middleName" is required',
  }),
  lastName: Joi.string()
    .required()
    .pattern(/^[A-Za-z]+$/, "alphabetic characters only")
    .messages({
      "string.base": '"lastName" should be a string',
      "string.empty": '"lastName" is required',
      "string.pattern.base":
        '"lastName" should contain only alphabetic characters',
    }),
});

const guardianValidationSchema = Joi.object({
  fatherName: Joi.string().optional(),
  fatherOccupation: Joi.string().optional(),
  fatherContactNo: Joi.string().optional(),
  motherName: Joi.string().optional(),
  motherOccupation: Joi.string().optional(),
  motherContactNo: Joi.string().optional(),
});

const localGuardianValidationSchema = Joi.object({
  name: Joi.string().optional(),
  occupation: Joi.string().optional(),
  contactNo: Joi.string().optional(),
  address: Joi.string().optional(),
});

const studentValidationSchema = Joi.object({
  id: Joi.string().required().messages({
    "string.base": '"id" should be a string',
    "string.empty": '"id" is required',
  }),
  name: userNameValidationSchema,
  gender: Joi.string().valid("Male", "Female", "other").required().messages({
    "string.base": '"gender" should be a string',
    "any.only": '"gender" must be one of [Male, Female, other]',
    "string.empty": '"gender" is required',
  }),
  dateOfBirth: Joi.string().optional(),
  email: Joi.string().email().required().messages({
    "string.base": '"email" should be a string',
    "string.empty": '"email" is required',
    "string.email": '"email" must be a valid email address',
  }),
  contactNo: Joi.string().required().messages({
    "string.base": '"contactNo" should be a string',
    "string.empty": '"contactNo" is required',
  }),
  emergencyContactNo: Joi.string().optional(),
  bloodGroup: Joi.string()
    .valid("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-")
    .optional(),
  presentAddress: Joi.string().required().messages({
    "string.base": '"presentAddress" should be a string',
    "string.empty": '"presentAddress" is required',
  }),
  pernamentAddress: Joi.string().required().messages({
    "string.base": '"pernamentAddress" should be a string',
    "string.empty": '"pernamentAddress" is required',
  }),
  gurdian: guardianValidationSchema.required().messages({
    "object.base": '"gurdian" should be an object',
    "any.required": '"gurdian" is required',
  }),
  localGurdian: localGuardianValidationSchema.required().messages({
    "object.base": '"localGurdian" should be an object',
    "any.required": '"localGurdian" is required',
  }),
  profileImg: Joi.string().optional(),
  isActive: Joi.string().valid("ACTIVE", "BLOCKED").default("ACTIVE").messages({
    "string.base": '"isActive" should be a string',
    "any.only": '"isActive" must be one of [ACTIVE, BLOCKED]',
  }),
});
export default studentValidationSchema;
