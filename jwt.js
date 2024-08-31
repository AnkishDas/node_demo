const jwt = require('jsonwebtoken');

const jwtAuthMiddleware=(req,res,next)=>{
const token=req.headers.authorixation.split(' ')[1];

if(!token) return res.status(401).json({error:'unauthorized'});

try{
   const decoded= jwt.verify(token,process.env.JWT_SECRET);
    req.user=decoded
    next();
}catch(err){
    console.error(err);
    res.status(401).json({error:'Invalid token'});
}

}

module.exports=jwtAuthMiddleware