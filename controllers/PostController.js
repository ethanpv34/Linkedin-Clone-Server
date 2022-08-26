const asyncHandler = require("express-async-handler")
const db = require("../models")
const Post = db.Post
const User = db.User

const getPosts = asyncHandler(async (req, res) => {
    const posts = await Post.findAll()
    res.status(200).json(posts)
})

const createPost = asyncHandler(async (req, res) => {
    const id = req.user.id
    const user = await User.findByPk(id)
    if(!user) {
        res.status(400).json({ message: "Not authorized" })
    }
    const { message, description } = req.body
    const name = req.user.fullName
    const post = await Post.create({
        name,
        message,
        description
    })
    res.status(201).json(post)
})

const deletePost = asyncHandler(async (req, res) => {
    const user_id = req.user.id
    const user = await User.findByPk(user_id)
    if(!user) {
        res.status(400).json({ message: "Not authorized" })
    }
    const id = req.params.id
    const post = await Post.findByPk(id)
    if (post.name !== user.fullName) {
        res.status(400).json({ message: "You are not authorizaed to delete this post" })
    } else {
        await Post.destroy({ where: { id: post.id } }).then((num) => {
            if(num === 1) {
                res.status(200).json(post)
            } else {
                res.status(400).json({ message: "Something went wrong when deleting" })
            }
        })
    }
})

module.exports = {
    getPosts,
    createPost,
    deletePost
}