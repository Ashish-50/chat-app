import { Request, Response, NextFunction } from "express";
import { AuthService } from "../service/auth.service";

const authService = new AuthService();

export const signup = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const response = await authService.signup(req.body);
    res.status(201).json(response);
  } catch (error) {
    next(error); 
  }
};

export const login = async (req: Request, res: Response,next:NextFunction): Promise<any> => { // need to write return type of this
  try {
    const { email } = req.body;
    const response = await authService.login(email);
    return res.json(response);
  } catch (error) {
    next(error)
  }
};
export const logout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.clearCookie("token");
      res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      next(error);
    }
  };
