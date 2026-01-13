import {Router} from "express";
import { deleteMenuItem, getMenuItemById, updateMenuItem } from "../controllers/menuController.js"; 
import {requireAuthorization} from "../utils/auth.js"

const router = Router()

router.get('/:id',getMenuItemById)
router.patch('/:id',requireAuthorization(["admin"]),updateMenuItem)
router.delete('/:id',requireAuthorization(["admin"]),deleteMenuItem)

export default router;