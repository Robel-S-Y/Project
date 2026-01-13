import models from "../models/index.js";
import { ValidationError } from "sequelize";
import argon from "argon2";
import jwt from "jsonwebtoken";

const { User } =models

export const createUser = async(req, res)=>{
        try{
            const {name,  email, password, role}=req.body
            const hashedPassword = await argon.hash(password)
            const created = await User.create({name,  email, password:hashedPassword, role})
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
                message:"Failed to create user",
                error: error.message
            });
}
}

export const getUser = async(req,res)=>{
    try{
    const users = await User.findAll(/*{
        include:{
            model: Product,
            as:'products'
        }
    }*/)
    res.status(200).json({users: users})
    }
    catch(error){
    res.status(400).json({
        message:"Failed to fetch users",
        error: error.message
    });
    }
}

export const getUserById = async(req,res)=>{
    try{
        const id=req.params.id
        const user = await User.findByPk(id)
        if(!user)
        {
            return res.send({
                message:"user not found by this id."
            })
        }
    res.status(200).json(user)
    }
    catch(error){
    res.status(400).json({
        message:"Failed to fetch user",
        error: error.message
    });
    }
}

export const updateUser = async(req,res)=>{
    try{
        const {name,  email}=req.body
        const id=req.params.id
        const user = await User.findByPk(id)
        if(!user)
        {
            return res.send({
                message:"user not found by this id."
            })
        }
        await user.update({name,  email})
        const {password:pwd,...rest}=user
        res.json({
            message:"User updated successfully",
            user:rest
        })
    } catch(error){
        if (error instanceof ValidationError) {
            return res.status(400).json({
                message: "Validation failed",
                errors: error.errors.map(e => e.message),
            });
            }
            res.status(500).json({
                message:"Failed to update user",
                error: error.message
            });
    }
}

export const deleteUser = async(req,res)=>{
      try{
        const id=req.params.id
        const user = await User.findByPk(id)
        if(!user)
        {
            return res.send({
                message:"user not found by this id or is already deleted"
            })
        }
        await user.destroy();
        res.json({
            message:"User was deleted successfully"
        })
    } catch(error){
        if (error instanceof ValidationError) {
            return res.status(400).json({
                message: "Validation failed",
                errors: error.errors.map(e => e.message),
            });
            }
            res.status(500).json({
                message:"Failed to delete user",
                error: error.message
            });
    }
}

export const login =async(req,res) =>{
    try{
        const {email,password}=req.body
        const user=await User.findOne({where:{email}});
        if(!user)
        {
            return res.status(404).json({
                message:"User Not Found"
            })
        }

        const checkPassword = await argon.verify(user.password, password)
        if(!checkPassword)
        {
            return res.status(401).json({
                message:"Invalid Credentials"
            })
        }

        const access_token =generateToken({user_id:user.id,role:user.role,expires_in:"30m",type:"access_token"})
        const refresh_token =generateToken({user_id:user.id,expires_in:"2h",type:"refresh_token"})
        const { password:pwd, ...rest } = user.toJSON();

        return res.status(200).json({
            message:"Login successfull!",
            user:rest,
            access_token:access_token,
            refresh_token:refresh_token
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
                message:"Failed to Login",
                error: error.message
            });
    }
}

export const Refresh_token =async (req,res) =>{
    
    try {
        const refresh_token= req.headers.authorization.split(" ")[1]
        if(!refresh_token){
            return res.status(401).json({
                message:"Unauthorized"
            })
        }

        const decoded = jwt.verify(refresh_token, process.env.JWT_SECRET_REFRESH)

        const user=await User.findOne({where:decoded.user_id});

        const access_token =generateToken({user_id:user.id,role:user.role,expires_in:"30m",type:"access_token"})
        const refresh_token_new =generateToken({user_id:user.id,expires_in:"2h",type:"refresh_token"})
        res.send({
            access_token:access_token,
            refresh_token:refresh_token_new
        })
    } catch (error) {
                if (error instanceof ValidationError) {
            return res.status(400).json({
                message: "Validation failed",
                errors: error.errors.map(e => e.message),
            });
            }
            res.status(500).json({
                message:"Failed to Refresh access_token",
                error: error.message
            });
    }
}

const generateToken = ({user_id,role="",expires_in,type}) =>{
    return jwt.sign({user_id,role},type==='access_token' ? process.env.JWT_SECRET : process.env.JWT_SECRET_REFRESH, {expiresIn:expires_in})
}