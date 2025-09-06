import { Router } from "express";
import { login, register } from "../controllers/authController.js";
import { validateLoginUser, validateRegisterUser } from "../middleware/validationMiddleware.js";

const router = Router()

router.post('/login', validateLoginUser, login)
router.post('/register', validateRegisterUser, register)

export default router