import sequelize from "../config/db.js";
import MenuItems from "./menuItem.js";
import OrderItems from "./orderItem.js";
import Orders from "./orders.js";
import Restaurant from "./restaurant.js";
import User from './user.js'


const models ={
    User:User(sequelize),
    Restaurant:Restaurant(sequelize),
    MenuItems:MenuItems(sequelize),
    Orders:Orders(sequelize),
    OrderItems:OrderItems(sequelize)
}

Object.values(models).forEach((model)=>{
    if(model.associate){
        model.associate(models)
    }
})

export {sequelize}

export default models