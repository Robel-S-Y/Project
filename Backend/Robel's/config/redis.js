import Redis from 'ioredis';


const redis =new Redis({
    host:'localhost',
    port: 6379,
    password:'',
    retryDelayOnFailover :100,
    naxRetriesPerRequest:3,
    lazyConnect:true,
    showFriendlyErrorStack: true
})

redis.on('connect',()=>{
    console.log("Redis connected")
})

redis.on('error',(error)=>{
    console.log("Redis connection error",error)
})

redis.on('ready',()=>{
    console.log("Redis is ready to use")
})

export default redis