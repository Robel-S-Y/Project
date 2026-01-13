import express from "express";
import indexRouter from './routes/index.router.js';
import sequelize from './config/db.js';
import redis from './config/redis.js';


const app=express();
app.use(express.json())
const port=4040;

try{
    await sequelize.authenticate()
    console.log('DB Connected')

    await sequelize.sync({alter:true})
    console.log('DB synced')
}catch(error){
    console.log("connection error",error)
}

app.listen(port,()=>
{
    console.log(`server is running on port ${port}`)
} )

app.use('/api',indexRouter)

//redis cache

app.post('/api/cache/delete/',(req,res)=>{
    try {
    const key =req.body.key
    redis.del(key)
    res.send({
        succcess:true
    }) 
    } catch (error) {
    res.status(500).send({
        message: "Failed to delete cache",
        error:error.message
    })        
    }
    
})