import { Router } from "express";
import { registerUser,loginUser,getUser } from "../controller/authController";
import { authenticate } from "../middleware/authentiacte";

const router = Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/user/:userId', authenticate, getUser)

export default router