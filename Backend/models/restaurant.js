import { DataTypes } from "sequelize";

export default function (sequelize){
    const Restaurant = sequelize.define("Restaurant",{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull:false
        },
        name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        location:{
            type:DataTypes.STRING,
            allowNull:false
        },
    },{
            timestamps : true
        })

        Restaurant.associate=(models)=>{
            Restaurant.hasMany(models.Orders, { foreignKey: "restaurantId", onDelete: "SET NULL", onUpdate: "CASCADE" });
            Restaurant.hasMany(models.MenuItems,{foreignKey:'restaurantId',as:'MenuItems', onDelete: "CASCADE" , onUpdate: "CASCADE", hooks: true})
        }
            
    return Restaurant
}