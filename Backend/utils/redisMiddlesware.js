import redis from "../config/redis.js ";

export const redisMiddleware =(duration = 60) =>{
    return async (req,res,next) =>{
        if (req.method !=='GET'){
            return next()
        }

        const route = req.originalUrl
        const key = `cache_${route}`
        console.log("key :",key)
        try {
            const cacheData = await redis.get(key)
            if(cacheData){
                console.log("serving from cache");
                return res.json(JSON.parse(cacheData))
            }

            const originalJson =res.json;
            res.json=async(data) =>{
                redis.setex(key,duration,JSON.stringify(data)).then(()=>{
                    console.log("Data cached");
                }).catch((err)=>{
                    console.log("Redis setex error",err);
                });

                return originalJson.call(res, data);

            }
            next()

        } catch (error) {
            console.log("Redis error",error);
            next()
        }
    }
}

export const clearcache =async (key)=>{
    return async (req,res,next)=>{
        try {
            await redis.del(key)
            console.log("cache cleared for key:",key);
            next()
        } catch (error) {
            console.log("Redis delete error",error);
            next()           
        }
    }
}