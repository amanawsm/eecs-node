const jwt =require('jsonwebtoken');
const Admin = require('../models/Admin');
const Client = require('../models/Clients');
const User = require('../models/User');

const getcheck = async (req,res,next)=>{
   const token = req.headers.authorization;
    if (token) {
        try {
        var decode =  jwt.verify(token,'saha_token_2055');
            
        } catch (error) {
        return res.send({
            status:'failed',
            message:'error in token'
        })
            
        }
      
    // const admin = await Admin.findOne({_id:decode?._id});
    // const client = await Client.findOne({_id:decode?._id});
    // const user = await User.findOne({_id:decode?._id});
      
    const admin = await Admin.findOne({_id:decode._id});
    const client = await Client.findOne({_id:decode._id});
    const user = await User.findOne({_id:decode._id});
    
    if(!admin && !client && !user){
        
        return res.send({
            status:'failed',
            message:'not a valid user'
        })

    }else{
        // res.locals.user=user
        // res.locals.token=token
        req.admin=admin;
        req.client=client;
        req.user=user;
        req.token=token;
        // console.log(req.token);
        // console.log(req.client);
        next();
        // res.redirect('/dashboard');

    }
    
    
}else{
    return res.send({
        status:'failed',
        message:'not a valid token'
    })
}
}

module.exports = {getcheck}