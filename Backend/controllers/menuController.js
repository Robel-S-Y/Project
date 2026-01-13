import models from "../models/index.js";
import { ValidationError } from "sequelize";


const {MenuItems} =models

export const createMenuItem = async(req, res)=>{
        try{
            const {name,price}=req.body
            const restaurantId=req.params.id
            const created = await MenuItems.create({name,restaurantId, price})
            res.status(201).json({
                message:"successfully created menu item",
                MenuItem:created
            })
        }
        catch(error){
            if (error instanceof ValidationError) {
            return res.status(400).json({
                message: "Validation failed",
                errors: error.errors.map(e => e.message),
            });
            }
            res.status(500).json({
                message:"Failed to create Menu item",
                error: error.message
            });
}
}

export const getMenuItemsByRestaurant = async(req,res)=>{
    try{

    const menuItem = await MenuItems.findAll({ where: { restaurantId: req.params.id } })

    res.status(200).json(
        {
            message:"successfully fetched restaurants menu",
            Menu:menuItem
        }
    )
    }
    catch(error){
    res.status(400).json({
        message:"Failed to fetch menu",
        error: error.message
    });
    }
}

export const getMenuItemById = async(req,res)=>{
    try{
        const id=req.params.id
        const menuItem = await MenuItems.findByPk(id)
        if(!menuItem)
        {
            return res.send({
                message:"Menu not found by this id."
            })
        }
    res.status(200).json({
        message:"successfully fetched menu item",
        MenuItems:menuItem
    })
    }
    catch(error){
    res.status(400).json({
        message:"Failed to fetch Menu item",
        error: error.message
    });
    }
}

export const updateMenuItem = async(req,res)=>{
    try{
        const {name,  price}=req.body
        const id=req.params.id
        const menuItem = await MenuItems.findByPk(id)
        if(!menuItem)
        {
            return res.send({
                message:"Menu item item not found by this id."
            })
        }
        await menuItem.update({name,  price})
        res.json({
            message:"Menu item updated successfully",
            MenuItem:menuItem
        })
    } catch(error){
        if (error instanceof ValidationError) {
            return res.status(400).json({
                message: "Validation failed",
                errors: error.errors.map(e => e.message),
            });
            }
            res.status(500).json({
                message:"Failed to update menu item",
                error: error.message
            });
    }
}

export const deleteMenuItem = async(req,res)=>{
      try{
        const id=req.params.id
        const menuItem = await MenuItems.findByPk(id)
        if(!menuItem)
        {
            return res.send({
                message:"Menu item not found by this id or is already deleted"
            })
        }
        await menuItem.destroy();
        res.json({
            message:"Menu item was deleted successfully"
        })
    } catch(error){
        if (error instanceof ValidationError) {
            return res.status(400).json({
                message: "Validation failed",
                errors: error.errors.map(e => e.message),
            });
            }
            res.status(500).json({
                message:"Failed to delete menu item",
                error: error.message
            });
    }
}
