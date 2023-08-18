const express = require('express');
const bodyParser = require('body-parser');
const routes = express.Router();
const userController = require("../controller/usersController");


routes.post('/login', userController.loginUser);

module.exports = {
    express, routes
}