const jwt = require('jsonwebtoken');
require('dotenv').config({path : 'variables.env'});

exports.auth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Auth failed'
    });
  }
};

exports.admin = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.userData = decoded;
    const role = req.userData.role;
    if (role == "Admin"){
      next();
    }else{
      return res.status(401).json({
        message: 'Only "Admin" role'
      });
    }
  } catch (error) {
    return res.status(401).json({
      message: 'Auth failed'
    });
  }
};