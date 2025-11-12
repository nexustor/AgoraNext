const express = require("express");
const { listPosts, getPost, createPost, updatePost, deletePost } = require("../controllers/postsController");

const router = express.Router();

router.get("/", listPosts);
router.get("/:id", getPost);
router.post("/", createPost);     // requiere user_id existente
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

module.exports = router;
