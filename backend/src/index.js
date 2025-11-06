const express = require("express");
const cors = require("cors");
require("dotenv").config();

const productsRouter = require("./routes/products");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("API de AgoraNext funcionando 🚀"));
app.use("/api/products", productsRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API en http://localhost:${PORT}`));
