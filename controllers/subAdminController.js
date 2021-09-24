var pool = require('../config/db');

const getAllUsers = async(req, res, next)=> {
    try{
    const user =await pool.query('select * from "userDetails"');
    res.json({user:user.rows});
    }catch(error){
      res.status(500).json({error:error.message});
    }
};


module.exports = {getAllUsers};