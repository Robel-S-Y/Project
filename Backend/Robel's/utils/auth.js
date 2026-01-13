import jwt from 'jsonwebtoken'


export function requireAuthorization(roles){
    return function(req, res, next){
    const access_token=req.headers.authorization?.split(" ")[1]
    if(!access_token){
        return res.status(401).json({
            message: "Unauthorized!"
        })
    }
    try {
        const decoded=jwt.verify(access_token,process.env.JWT_SECRET)
        const roleexists = roles.includes(decoded.role)
        const owner=req.params.id == decoded.user_id
        if(!roleexists && !owner){
         return res.status(403).json({
            message: "Forbidden!"
        })
        }
        req.user_id = decoded.user_id;
        req.role = decoded.role;
        next()
    } catch (error) {
        console.log('from catch')
          return res.status(401).json({
            message: "Unauthorized!"
        })
    }
    }
}