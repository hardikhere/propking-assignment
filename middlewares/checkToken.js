const User = require("../models/User");
const jwt = require('jsonwebtoken');

const checkUser = async (decoded) => {
    const { id } = decoded;
    return User.findById({ _id: id }, (err, doc) => {
        if (err) return false;
        if (!doc) return false;
        return true;
    })
}

let checkToken = (req, res, next) => {
    let token = req.headers["x-access-token"] || req.headers["authorization"];
    console.log(token);
    if (!token)
        return res.status(403).json({
            message: "Token is Missing",
            error: true,
            success: false
        })

    if (token.startsWith("Bearer "))
        token = token.slice(7, token.length);

    if (token) {
        jwt.verify(token, process.env.JWTSECRET, async (err, decoded) => {
            if (err)
                return res.status(400).json({
                    message: "Invalid Token!",
                    error: err,
                    success: false
                })
            else {
                req.decoded = decoded;
                console.log("decoded is ", decoded)
                checkUser(decoded)
                    .then((checkUser) => {
                        console.log("check user is ", checkUser)
                        if (checkUser)
                            next();
                        else return res.status(404).json({
                            message: "User Not Available",
                            error: true,
                            success: false
                        })
                    })
                    .catch((error) => {
                        console.log(error.message, error)
                        return res.status(500).json({
                            message: "Token Verification Failed",
                            error,
                            success: false
                        })
                    });
            }
        });
    }
};


module.exports = checkToken;