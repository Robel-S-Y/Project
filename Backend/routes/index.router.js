import {Router} from "express";
import authRouter from "./auth.router.js"
import userRouter from "./user.router.js"
import restaurantRouter from "./restaurant.router.js";
import menuItemRouter from "./menuItem.router.js"
import orderRouter from "./order.router.js"

const router =Router() 

router.use("/auth",authRouter)
router.use("/users",userRouter)
router.use("/restaurants",restaurantRouter)
router.use("/menu",menuItemRouter)
router.use("/orders",orderRouter)

export default router;