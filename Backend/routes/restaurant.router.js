import {Router} from "express";
import { createRestaurant, deleteRestaurant, getRestaurantById, getRestaurants, updateRestaurant } from "../controllers/restaurantController.js";
import { createMenuItem, getMenuItemsByRestaurant } from "../controllers/menuController.js";
import {requireAuthorization} from "../utils/auth.js"
import { redisMiddleware } from "../utils/redisMiddlesware.js";


const router = Router()

router.post('/',requireAuthorization(["admin"]),createRestaurant)
router.get('/',redisMiddleware(),getRestaurants)
router.get('/:id',getRestaurantById)
router.patch('/:id',requireAuthorization(["admin"]),updateRestaurant)
router.delete('/:id',requireAuthorization(["admin"]),deleteRestaurant)
router.post('/:id/menu',requireAuthorization(["admin"]),createMenuItem)
router.get('/:id/menu',getMenuItemsByRestaurant)

export default router;