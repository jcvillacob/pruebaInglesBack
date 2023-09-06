const jwt = require('jsonwebtoken');
const User = require('../../users/model/userModel');

exports.login = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: 'No User'
                });
            }
            const pass = req.body.password;
            const passR = user[0].password;
            if (pass != passR) {
                return res.status(401).json({
                    message: 'incorrect Password'
                });
            } else {
                const token = jwt.sign(
                    {
                        email: user[0].email,
                        userId: user[0]._id,
                    },
                    process.env.JWT_KEY,
                    {
                        expiresIn: "1h"
                    }
                );
                return res.status(200).json({
                    message: 'Auth successful',
                    token: token
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};