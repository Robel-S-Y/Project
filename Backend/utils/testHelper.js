import argon from "argon2";
import jwt from 'jsonwebtoken';



export const generateToken = ({user_id,role="",expires_in,type}) =>{
    return jwt.sign({user_id,role},type==='access_token' ? process.env.JWT_SECRET : process.env.JWT_SECRET_REFRESH, {expiresIn:expires_in})
}

export const hashPassword = async (password) =>{
    return await argon.hash(password)
}

export const verifyPassword = async (hashedPassword,plainPassword)=>{
    return await argon.verify(hashedPassword, plainPassword)
}

export const createTestUser =async (User,userData)=>{
    const hashedPassword =await hashPassword(userData.password)
    return await User.create({
        ...userData,
        password:hashedPassword
    })
}

export const createTestRestaurant =async (Restaurant,restaurantData)=>{
    return await Restaurant.create(restaurantData)
}

export const createTestMenuItem =async (MenuItems,MenuItemData)=>{
    return await MenuItems.create(MenuItemData)
}

export const createTestOrder =async (Orders,OrderItems,orderData,userId)=>{
            const {restaurantId,Order_items}=orderData
            const created = await Orders.create({restaurantId,userId})
            const createdOrderItems = await OrderItems.bulkCreate(
            Order_items.map(item => ({
                orderId: created.id,
                menuItemId: item.menuItemId,
                quantity: item.quantity
            }))
            );
            return {Order: { 
                    created,
                    OrderItems:{ createdOrderItems }
                }
                }
}

export const loginTest =async (User,loginData)=>{
    const user=await User.findOne({where:{email:loginData.email}});
    const password=loginData.password
            if(!user)
            {
                return "User Not Found"
            }
    
            const checkPassword = await argon.verify(user.password, password)
            if(!checkPassword)
            {
                return "Invalid Credentials"                
            }
    
            const access_token =generateToken({user_id:user.id,role:user.role,expires_in:"30m",type:"access_token"})
               
            return access_token
            
}