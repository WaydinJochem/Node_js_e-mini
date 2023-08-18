const express = require('express');
const bodyParser = require('body-parser');
const routes = express.Router();
const userController = require("../controller/usersController");

//post methods
routes.post('/login', userController.loginUser);
routes.post('/register',bodyParser.json(), userController.registerUser);

//get methods
routes.get('/user/:id', userController.singleUser);
routes.get('/users', userController.allUsers);

//delete methods
routes.delete('/user/:id', userController.deleteUsers);

//put methods
routes.put('/user/:id',bodyParser.json(), userController.updateUsers);

//patch methods
routes.patch('/user/:id', bodyParser.json(), userController.updateUsers)

module.exports = {
    express, routes
}