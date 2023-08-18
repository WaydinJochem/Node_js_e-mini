const Users = require('../models/user');

//registration
exports.registerUser = (req, res) => {
  Users.register(req, res);
};
//login
exports.loginUser = (req, res) => {
  Users.login(req, res);
};
//Display single user
exports.singleUser = (req, res) => {
  Users.fetchUser(req, res);
};
//Display all users
exports.allUsers = (req, res) => {
  Users.fetchUsers(req, res);
};
//Delete user
exports.deleteUsers = (req, res) => {
  Users.deleteUsers(req, res);
};
//Update user
exports.updateUsers = (req, res) => {
  Users.updateUsers(req, res);
};
