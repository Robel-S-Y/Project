import { DataTypes } from "sequelize";

export default function (sequelize){
    const OrderItems = sequelize.define("OrderItems",{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull:false
        },
        orderId:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        menuItemId:{
            type:DataTypes.INTEGER,
            allowNull:true
        },
        quantity:{
            type:DataTypes.INTEGER,
            allowNull:false
        }
    },{
            timestamps : true
        })

         OrderItems.associate=(models)=>{
            OrderItems.belongsTo(models.Orders,{foreignKey:'orderId',as:'Order', onDelete: "CASCADE", onUpdate: "CASCADE"})

            OrderItems.belongsTo(models.MenuItems,{foreignKey:'menuItemId',as:'MenuItem', onDelete: "SET NULL", onUpdate: "CASCADE"})
        }
    return OrderItems
}