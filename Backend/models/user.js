import { DataTypes } from "sequelize";

export default function (sequelize){
    const User = sequelize.define("User",{
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
        email:{
            type:DataTypes.STRING,
            allowNull:false,
            unique: true,
            validate:{
                isEmail:true
            }
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false
        },
        role:{
            type:DataTypes.ENUM('customer','admin'),
            defaultValue:'customer'
        }
    },{
            timestamps : true
        })

        User.associate=(models)=>{User.hasMany(models.Orders, { foreignKey: "userId", onDelete: "CASCADE", onUpdate: "CASCADE" })}
            
    return User
}