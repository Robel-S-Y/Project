import models from "../models/index.js";
import { ValidationError } from "sequelize";


const {OrderItems,Orders} =models



export const getOrderItemsByOrder = async(req,res)=>{
    try{
        const id=req.params.id
    if(req.role === "admin"){
                const orderItems = await OrderItems.findAll({where: { orderId: id }})
                if(orderItems.length==0)
                {
                    return res.send({
                        message:"Order items not found by this id."
                    })
                }
               return res.status(200).json(
                {
                    message:"Order items fetched successfully!",
                    Order: orderItems
                }
            )
    }
    else if(req.role==="customer"){
        const orderItem = await OrderItems.findAll({
            where: { orderId: req.params.id },
            include: {
                model: Orders,
                as: "Order",
                where: { userId: req.user_id }
            }
            });
            if(!orderItem)
            {
                return res.send({
                    message:"Your order items by this id are not found."
                })
            }
        return res.status(200).json(
            {
                message:"Order items fetched successfully!",
                Order: orderItem
            }
        )        
    }
    else{
       return res.status(401).json(
            {
            message:"Unauthorized!"
            }
        ) 
    }
    }
    catch(error){
    res.status(400).json({
        message:"Failed to fetch Order",
        error: error.message
    });
    }
}

export const updateOrderItemQuantity = async(req,res)=>{
    try{
        const {quantity}=req.body
        const id=req.params.id
        const itemId=req.params.itemId 
        const orderItem = await OrderItems.findOne({
        where: { id: itemId, orderId: id },
        include: {
            model: Orders,
            as: "Order",
            where: { userId: req.user_id }
        }
        });
        if(!orderItem)
        {
            return res.send({
                message:"Order or order item not found by this id."
            })
        }
        if(orderItem.Order.status !== "pending"){
             return res.status(403).json({
                        message:"Order have been delivered already or is in preparing status, cannot change quantity.",
                     })  
        }
        await orderItem.update({quantity})
        res.json({
            message:"Order item quantity updated successfully",
            OrderItem:orderItem
        })
    } catch(error){
        if (error instanceof ValidationError) {
            return res.status(400).json({
                message: "Validation failed",
                errors: error.errors.map(e => e.message),
            });
            }
            res.status(500).json({
                message:"Failed to update Order item quantity",
                error: error.message
            });
    }
}

export const deleteOrderItem = async(req,res)=>{
      try{
        const id=req.params.id
        const itemId=req.params.itemId 
        const orderItem = await OrderItems.findOne({
        where: { id: itemId, orderId: id },
        include: {
            model: Orders,
            as: "Order",
            where: { userId: req.user_id }
        }
        });
        if(!orderItem)
        {
            return res.send({
                message:"Order or order item not found by this id or it has been removed or canceled already."
            })
        }
        if(orderItem.Order.status !== "pending")
        {
        return res.json({
            message:"Order has been delivered cannot be deleted"
        })}
        await orderItem.destroy();
            return res.json({
            message:"Order item was deleted successfully"
        })
          
    } catch(error){
        if (error instanceof ValidationError) {
            return res.status(400).json({
                message: "Validation failed",
                errors: error.errors.map(e => e.message),
            });
            }
            res.status(500).json({
                message:"Failed to delete Order item",
                error: error.message
            });
    }
}