const express = require("express");
const { listUsers, getUser, createUser, updateUser, deleteUser } = require("../controllers/usersController");

const router = express.Router();

router.get("/", listUsers);
router.get("/:id", getUser);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
