import models from "../models/index.js";
import { ValidationError } from "sequelize";



const {Orders,OrderItems} =models

export const createOrders = async(req, res)=>{
        try{
            const {restaurantId,Order_items}=req.body
            const created = await Orders.create({restaurantId,userId:req.user_id})
            const createdOrderItems = await OrderItems.bulkCreate(
            Order_items.map(item => ({
                orderId: created.id,
                menuItemId: item.menuItemId,
                quantity: item.quantity
            }))
            );
            res.status(201).json(
                {
                    message:"Order created successfully!",
                    Order: { 
                    created,
                    OrderItems:{ createdOrderItems }
                }
                }
            )
        }
        catch(error){
            if (error instanceof ValidationError) {
            return res.status(400).json({
                message: "Validation failed",
                errors: error.errors.map(e => e.message),
            });
            }
            res.status(500).json({
                message:"Failed to create Orders",
                error: error.message
            });
}
}

export const getOrders = async(req,res)=>{
    try{
        if(req.role === "admin"){
            const orders = await Orders.findAll({
                include:{
                    model: OrderItems,
                    as:'OrderItems'
                }
            })
            return res.status(200).json(
                {
                message:"successfully fetched Orders!",
                Orders: orders
                }
            )
        }
        else if(req.role==="customer"){   
            const orders = await Orders.findAll({ where: { userId: req.user_id },
            include:{
                model: OrderItems,
                as:'OrderItems'
            }
            })
           return res.status(200).json(
                {
                message:"successfully fetched Orders!",
                Orders: orders
                }
        )
        }
        else{
           return res.status(200).json(
                {
                message:"Unauthorized!"
                }
            ) 
        }
    }
    catch(error){
        res.status(400).json({
            message:"Failed to fetch Orders",
            error: error.message
        });
    }
}

export const getOrdersById = async(req,res)=>{
    try{
        const id=req.params.id
    if(req.role === "admin"){
                const order = await Orders.findByPk(id,{
                include:{
                    model: OrderItems,
                    as:'OrderItems'
                }
            })
                if(!order)
                {
                    return res.send({
                        message:"Order not found by this id."
                    })
                }
               return res.status(200).json(
                {
                    message:"Order was fetched successfully!",
                    Order: order
                }
            )
    }
    else if(req.role==="customer"){
            const order = await Orders.findOne({
            where: { id, userId: req.user_id },  
            include: {
                model: OrderItems,
                as: 'OrderItems'
            }
            });
            if(!order)
            {
                return res.send({
                    message:"Your order by this id is not found."
                })
            }
        return res.status(200).json(
            {
                message:"Order was fetched successfully!",
                Order: order
            }
        )        
    }
    else{
       return res.status(200).json(
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

export const updateOrderStatus = async(req,res)=>{
    try{
        const {status}=req.body
        const id=req.params.id
        const order = await Orders.findByPk(id,{
        include:{
            model: OrderItems,
            as:'OrderItems'
        }
    })
console.log("req.body:", req.body);
console.log("status:", status);

        if(!order)
        {
            return res.send({
                message:"Orders not found by this id."
            })
        }  
        if(!status)
        {
            return res.send({
                message:"status input required"
            })
        }
        if(order.status ==="delivered"){
             return res.json({
                        message:"Order have been delivered already, cannot update status!",
                     })  
        }
        if(order.status ==="preparing" && status === "preparing" )
        {          
                return res.json({
                        message:"status is already on preparing",
                     }) 
        }
        if(order.status ==="preparing" && status === "pending"){
            return res.json({
                        message:"Order on a preparing mode cannot be set to pending.",
                     }) 
        }        
        if(order.status === "pending" && status === "pending" )
        {          
                return res.json({
                        message:"status is already on pending",
                     }) 
        }
        if(order.status ==="pending" && status === "delivered" )
        {          
                return res.json({
                        message:"Wrong sequence, status on pending cannot go directly to delivered!",
                     }) 
        }
        await order.update({status})
        res.json({
            message:"Order status updated successfully",
            Order:order
        })
    } catch(error){
        if (error instanceof ValidationError) {
            return res.status(400).json({
                message: "Validation failed",
                errors: error.errors.map(e => e.message),
            });
            }
            res.status(500).json({
                message:"Failed to update Order status",
                error: error.message
            });
    }
}

export const deleteOrder = async(req,res)=>{
      try{
        const id=req.params.id
        const order = await Orders.findByPk(id)
        if(!order)
        {
            return res.send({
                message:"Order not found by this id or is already deleted"
            })
        }
        if(req.role === "admin")
        {
        await order.destroy();
        return res.json({
            message:"Order was deleted successfully"
        })}
        else if(req.role==="customer" && order.status!=="delivered"){
                const order = await Orders.findOne({
                where: { id, userId: req.user_id },
                include: {
                    model: OrderItems,
                    as: 'OrderItems'
                }
                });
                if(!order)
                {
                    return res.send({
                        message:"Order not found by this id or is already deleted"
                    })
                }                
                await order.destroy();
                return res.json({
                    message:"Order was canceled successfully"
                })                
          }
          else{
            return res.json({
            message:"Order has been delivered cannot be deleted"
        })
          }
    } catch(error){
        if (error instanceof ValidationError) {
            return res.status(400).json({
                message: "Validation failed",
                errors: error.errors.map(e => e.message),
            });
            }
            res.status(500).json({
                message:"Failed to delete Order",
                error: error.message
            });
    }
}
