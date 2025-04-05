import dotenv from "dotenv";
dotenv.config()

import User, { IUser } from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const jwttoken = process.env.JWT_SECRET
const EXPIRE_IN = process.env.EXPIRE_IN

export class AuthService {
  async signup(userData: { fullName: string; username: string; email: string; password: string }) {
    const { fullName, username, email, password } = userData;


    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    return { message: "User registered successfully" };
  }

  async login(email: string) {
    const user = await User.findOne({ email });
    const token = jwt.sign({ userId: user!.id, email: user!.email }, jwttoken as string, {
        expiresIn: EXPIRE_IN as string,
    });

    return { token, user };
  }
}
