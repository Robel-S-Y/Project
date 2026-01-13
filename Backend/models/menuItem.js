import { DataTypes } from "sequelize";

export default function (sequelize){
    const MenuItems = sequelize.define("MenuItems",{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true,
            allowNull:false
        },
        restaurantId:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        price:{
            type:DataTypes.DECIMAL(10,2),
            allowNull:false,
            validate:{
                isDecimal: true,
                min: 0.01
            }
        },
    },{
            timestamps : true
        })

         MenuItems.associate=(models)=>{
            MenuItems.belongsTo(models.Restaurant,{foreignKey:'restaurantId',as:'Restaurant', onDelete: "CASCADE", onUpdate: "CASCADE"})
            MenuItems.hasMany(models.OrderItems, { foreignKey: "menuItemId", onDelete: "SET NULL", onUpdate: "CASCADE" });
        }
    return MenuItems
}