const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")
const db = require("../models")
const User = db.User

const protect = asyncHandler(async (req, res, next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findByPk(decoded.id)
            next()
        } catch (err) {
            res.status(400).json({ message: "Wrong token" })
        }
    } else {
        res.status(400).json({ message: "No token provided" })
    }
})

module.exports = { protect }