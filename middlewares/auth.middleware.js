const jwt = require('jsonwebtoken');

const authentication = (req,res,next)=>{
    const token = req.headers.authorization

    if(token){
        try {
            const decoded = jwt.verify(token.split(" ")[1], 'masai');
            if(decoded){
                req.body.userId = decoded.userid
                next()
            }else{
                res.status(400).json({err:"Please login first!!"})
            }
        } catch (error) {
            res.status(400).json({err: error.message})
        }
    }else{
        res.json({msg: "Please login!!"})
    }  
}

module.exports = {
    authentication
}