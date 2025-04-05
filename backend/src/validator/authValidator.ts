import { body } from "express-validator";
import User from "../models/user.model"
import bcrypt from "bcryptjs"

const checkExistingEmail = async (email: string) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return Promise.reject("Email already registered");
    }
  };

  const checkPasswordMatch = async (password: string, { req }: any) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid credentials");
    }
  };

export const signupValidator = [
  body("fullName").notEmpty().withMessage("Full Name is required"),
  body("username").notEmpty().withMessage("Username is required"),
  body("email").isEmail().withMessage("Invalid email").custom(checkExistingEmail),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
];

export const loginValidator = [
  body("email").isEmail().withMessage("Invalid email"),
  body("password").notEmpty().withMessage("Password is required").custom(checkPasswordMatch)
];