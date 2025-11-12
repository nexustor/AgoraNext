const express = require("express");
const cors = require("cors");
require("dotenv").config();

const usersRouter = require("./routes/users");
const postsRouter = require("./routes/posts");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => res.send("API de AgoraNext funcionando 🚀"));

app.use("/api/users", usersRouter);
app.use("/api/posts", postsRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API en http://localhost:${PORT}`));
