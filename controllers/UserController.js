const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const db = require("../models")
const User = db.User

const register = asyncHandler(async (req, res) => {
    const { fullName, email, password } = req.body
    const userExists = await User.findOne({ where: { email: email } })
    if(userExists) {
        res.status(400).json({ message: "Account with this email already exists" })
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const user = await User.create({
        fullName,
        email,
        password: hashedPassword
    })
    if(user) {
        res.status(201).json({
            id: user.id,
            fullName,
            email,
            token: genToken(user.id)
        })
    }
})

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ where: { email: email } })
    if(!user) {
        res.status(400).json({ message: "Account with this email does not exist" })
    }
    if(user && (await bcrypt.compare(password, user.password))) {
        res.status(200).json({
            id: user.id,
            fullName: user.fullName,
            email,
            token: genToken(user.id)
        })
    } else {
        res.status(400).json({ message: "Password incorrect, try again" })
    }
})

const genToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

module.exports = {
    register,
    login
}