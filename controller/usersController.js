const User = require('../models/user'); 

exports.registerUser = async (req, res) => {
  try {
    const newUser = await User.register(req.body);
    res.json(newUser);
  } catch (err) {
    res.status(500).json({ error: "Registration failed" });
  }
};

exports.loginUser = async (req, res) => {
  try {
    res.json({ token: "Authentication_Token" });
  } catch (err) {
    res.status(401).json({ error: "Login failed" });
  }
};

// exports.
