const UserSchema = require("../Models/userModel")
const validator = require("validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const createToken = (_id) => {
    const jwtKey = process.env.JWT_SECRET_KEY
    return jwt.sign({ _id }, jwtKey, { expiresIn: process.env.EXPIRES_IN })
}

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const user = await UserSchema.findOne({ email })
        if (user) {
            return res.status(400).json({
                status: "Fail",
                statusCode: 400,
                message: "User already exists with this given email"
            })
        }
        if (!name || !email || !password) {
            return res.status(400).json({
                status: "Fail",
                statusCode: 400,
                message: "All fields to be mandatory"
            })
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({
                status: "Fail",
                statusCode: 400,
                message: "Email must be a valid email"
            })
        }
        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({
                status: "Fail",
                statusCode: 400,
                constraints: "Password must atleast have one UpperCase, one LowerCase, one Numeric and one Special character and more than 8 characters",
                message: "Password to be strong"
            })
        }
        else {
            const user = new UserSchema({ name, email, password })
            const salt = await bcrypt.genSalt(10)
            user.password = await bcrypt.hash(user.password, salt)
            await user.save()

            const token = createToken(user._id)
            return res.status(200).json({
                status: "Success",
                data: {
                    statusCode: 200,
                    _id: user._id,
                    name,
                    email,
                    token
                },
                message: "User registered successfully"
            })
        }
    } catch (error) {
        res.status(500).json({
            status: "Fail",
            message: error
        })
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await UserSchema.findOne({ email })
        if (!user) {
            return res.status(400).json({
                status: "Fail",
                statusCode: 400,
                message: "Invalid email or password"

            })
        }
        const isValidPassword = await bcrypt.compare(password, user.password)
        if (!isValidPassword) {
            return res.status(400).json({
                status: "Fail",
                statusCode: 400,
                message: "Invalid email or password"

            })
        }
        else {
            const token = createToken(user._id)
            return res.status(200).json({
                status: "Success",
                data: {
                    statusCode: 200,
                    _id: user._id,
                    name: user.name,
                    email,
                    token
                },
                message: "Login successfully"
            })
        }
    } catch (error) {
        res.status(500).json({
            status: "Fail",
            message: error
        })
    }
}

const getUser = async (req, res) => {
    const userId = req.params.id
    try {
        const user = await UserSchema.findById(userId)
        if (user) {
            return res.status(200).json({
                status: "Success",
                data: {
                    _id: user._id,
                    name: user.name,
                    email: user.email
                },
                message: "Fetched user successfully"
            })
        }
    } catch (error) {
        res.status(500).json({
            status: "Fail",
            message: error
        })
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await UserSchema.find().select('-password -__v');
        if (users.length > 0) {
            return res.status(200).json({
                statusCode: 200,
                status: "Success",
                data: users,
                message: "Fetched users successfully"
            });
        } else {
            return res.status(404).json({
                statusCode: 404,
                status: "Fail",
                message: "No users found"
            });
        }
    } catch (error) {
        res.status(500).json({
            status: "Fail",
            message: error
        })
    }
}

module.exports = {
    registerUser,
    loginUser,
    getUser,
    getUsers
}
