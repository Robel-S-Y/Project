import {Router} from "express";
import { deleteUser, getUser, getUserById, updateUser } from "../controllers/userController.js";
import {requireAuthorization} from "../utils/auth.js"

const router = Router()

router.get('/',requireAuthorization(["admin"]),getUser)
router.get('/:id',requireAuthorization(["admin"]),getUserById)
router.patch('/:id',requireAuthorization(["admin"]),updateUser)
router.delete('/:id',requireAuthorization(["admin"]),deleteUser)

export default router;