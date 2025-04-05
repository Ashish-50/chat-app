
import { Router } from "express";
const router = Router();
import { signup, login, logout } from "../controllers/auth.controller";
import {signupValidator,loginValidator} from "../validator/authValidator"

router.post("/signup", signupValidator, signup);
router.post("/login", loginValidator, login);
router.post("/logout", logout);

export default router