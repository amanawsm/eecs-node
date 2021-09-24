var pool = require('../config/db');
const jwt = require('jsonwebtoken');
var expressValidator = require('express-validator');

const rootLogin = async(req, res, next)=> {
    try{
    const {email,password}=req.body;
    const user =await pool.query('select * from "userDetails" where "userEmail"=$1',[email]);

    //const accessToken = jwt.sign({ username: user.username,  role: user.role }, accessTokenSecret);



    res.json({user:user.rows});



    }catch(error){
      res.status(500).json({error:error.message});
    }
};


module.exports = {rootLogin};