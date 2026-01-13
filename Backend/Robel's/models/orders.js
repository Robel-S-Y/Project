import { DataTypes } from "sequelize";

export default function (sequelize){
    const Orders = sequelize.define("Orders",{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull:false
        },
        userId:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        restaurantId:{
            type:DataTypes.INTEGER,
            allowNull:true
        },
        status:{
            type:DataTypes.ENUM('pending','preparing','delivered'),
            defaultValue:'pending'
        }

    },{
            timestamps : true
        })

        Orders.associate=(models)=>{
            Orders.belongsTo(models.User, { foreignKey: "userId", onDelete: "CASCADE", onUpdate: "CASCADE" });

            Orders.belongsTo(models.Restaurant,{foreignKey:'restaurantId',as:'restaurant', onDelete: "SET NULL", onUpdate: "CASCADE"})

            Orders.hasMany(models.OrderItems,{foreignKey:'orderId',as:'OrderItems', onDelete: "CASCADE", onUpdate: "CASCADE",hooks: true})}
            
    return Orders
}