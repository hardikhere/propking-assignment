const User = require("../models/User");
const { jwtGenerator } = require("../utils/common");

const login = (req, res) => {
    User.findOne({ email: req.body.email }, async function (err, user) {
        if (user === null) {
            return res.status(400).json({
                message: "User not found.",
                success: false
            });
        }
        else {
            if (user.validPassword(req.body.password)) {
                const token = await jwtGenerator(user._id)
                return res.status(201).json({
                    message: "User Logged In",
                    success: true,
                    token,
                    data: user
                })
            }
            else {
                return res.status(400).json({
                    message: "Wrong Password",
                    success: false
                });
            }
        }
    });
};


const signup = (req, res) => {
    let newUser = new User();

    // Initialize newUser object with request data 
    newUser.name = req.body.name;

    newUser.email = req.body.email;


    newUser.password = req.body.password;

    // Call setPassword function to hash password 
    newUser.setPassword(req.body.password);

    // Save newUser object to database 
    newUser.save((err, User) => {
        if (err) {
            return res.status(400).json({
                message: "Failed to add user.",
                success: false,
                error: err
            });
        }
        else {
            return res.status(201).json({
                message: "User added successfully.",
                success: true,
                error: false,
            });
        }
    });
}

module.exports = {
    login,
    signup
}