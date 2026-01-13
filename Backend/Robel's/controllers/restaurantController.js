import models from "../models/index.js";
import { ValidationError } from "sequelize";


const {Restaurant,MenuItems} =models

export const createRestaurant = async(req, res)=>{
        try{
            const {name, location}=req.body
            const created = await Restaurant.create({name, location})
            res.status(201).json(created)
        }
        catch(error){
            if (error instanceof ValidationError) {
            return res.status(400).json({
                message: "Validation failed",
                errors: error.errors.map(e => e.message),
            });
            }
            res.status(500).json({
                message:"Failed to create Restaurant",
                error: error.message
            });
}
}

export const getRestaurants = async(req,res)=>{
    try{

    const Restaurants = await Restaurant.findAll({
        include:{
            model: MenuItems,
            as:'MenuItems'
        }
    })

    res.status(200).json(Restaurants)
    }
    catch(error){
    res.status(400).json({
        message:"Failed to fetch Restaurants",
        error: error.message
    });
    }
}

export const getRestaurantById = async(req,res)=>{
    try{
        const id=req.params.id
        const restaurant = await Restaurant.findByPk(id,{
        include:{
            model: MenuItems,
            as:'MenuItems'
        }
    })
        if(!restaurant)
        {
            return res.send({
                message:"Restaurant not found by this id."
            })
        }
    res.status(200).json(restaurant)
    }
    catch(error){
    res.status(400).json({
        message:"Failed to fetch Restaurant",
        error: error.message
    });
    }
}

export const updateRestaurant = async(req,res)=>{
    try{
        const {name,  location}=req.body
        const id=req.params.id
        const restaurant = await Restaurant.findByPk(id)
        if(!restaurant)
        {
            return res.send({
                message:"Restaurant not found by this id."
            })
        }
        await restaurant.update({name,  location})
        res.json({
            message:"Restaurant updated successfully",
            Restaurant:restaurant
        })
    } catch(error){
        if (error instanceof ValidationError) {
            return res.status(400).json({
                message: "Validation failed",
                errors: error.errors.map(e => e.message),
            });
            }
            res.status(500).json({
                message:"Failed to update Restaurant",
                error: error.message
            });
    }
}

export const deleteRestaurant = async(req,res)=>{
      try{
        const id=req.params.id
        const restaurant = await Restaurant.findByPk(id)
        if(!restaurant)
        {
            return res.send({
                message:"Restaurant not found by this id or is already deleted"
            })
        }
        await restaurant.destroy();
        res.json({
            message:"Restaurant was deleted successfully"
        })
    } catch(error){
        if (error instanceof ValidationError) {
            return res.status(400).json({
                message: "Validation failed",
                errors: error.errors.map(e => e.message),
            });
            }
            res.status(500).json({
                message:"Failed to delete Restaurant",
                error: error.message
            });
    }
}
