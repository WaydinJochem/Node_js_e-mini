const Users = require('../models/user'); 

exports.registerUser = (req,res)=>{
    Users.register(req,res)
};

exports.loginUser = (req,res)=>{
    Users.login(req, res)
;}
exports.singleUser =(req, res) =>{
    Users.fetchUser(req, res)
};
exports.allUsers = (req, res) =>{
    Users.fetchUsers(req, res)
};
exports.deleteUsers = (req, res)=>{
    Users.deleteUsers(req,res)
};