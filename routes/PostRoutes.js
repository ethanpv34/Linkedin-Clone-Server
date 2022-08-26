const express = require("express")
const { protect } = require("../middleware/AuthMiddleware")
const { getPosts, createPost, deletePost } = require("../controllers/PostController")

const router = express.Router()

router.route("/").get(getPosts).post(protect, createPost)
router.delete("/:id", protect, deletePost)

module.exports = router