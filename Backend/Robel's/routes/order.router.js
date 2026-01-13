import {Router} from "express";
import { createOrders,  deleteOrder,  getOrders, getOrdersById, updateOrderStatus } from "../controllers/orderController.js"; 
import { deleteOrderItem, getOrderItemsByOrder, updateOrderItemQuantity } from "../controllers/orderItemController.js";
import {requireAuthorization} from "../utils/auth.js"

const router = Router()

router.post('/',requireAuthorization(["customer"]),createOrders)
router.get('/',requireAuthorization(["customer","admin"]),getOrders)
router.get('/:id',requireAuthorization(["customer","admin"]),getOrdersById)
router.patch('/:id/status',requireAuthorization(["admin"]),updateOrderStatus)
router.delete('/:id',requireAuthorization(["customer","admin"]),deleteOrder)

//order items

router.get('/:id/items',requireAuthorization(["customer","admin"]),getOrderItemsByOrder)
router.patch('/:id/items/:itemId',requireAuthorization(["customer"]),updateOrderItemQuantity)
router.delete('/:id/items/:itemId',requireAuthorization(["customer"]),deleteOrderItem)

export default router;