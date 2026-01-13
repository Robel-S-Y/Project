import {Router} from "express";
import { createUser, login, Refresh_token } from "../controllers/userController.js";

const router = Router()

router.post('/login',login)
router.post('/register',createUser)
router.post('/refresh',Refresh_token)

export default router;