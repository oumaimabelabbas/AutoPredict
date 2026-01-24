const express = require("express");
const app = express();
const path = require("path");
const helmet = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const authRouter = require("./routers/authRouter");
const predictionRouter  = require("./routers/predictionRouter")
require("dotenv").config();

app.use(
  cors({
    origin: "http://localhost:8000",
    credentials: true,
  })
);

//app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//predict price (backend(node js//express) ----> fast_api(model))
app.post("/predict", async (req, res) => {
  try {
    const response = await fetch("http://127.0.0.1:8001/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body)
    });
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.use(express.static(path.join(__dirname, "public")));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => console.log(err));

app.use("/api/auth", authRouter);
app.use("/api/predictions",predictionRouter)

app.get("/", (req, res) => {
  res.json({ message: "hello from server" });
});

app.listen(process.env.PORT, () => {
  console.log("listening ... ");
});
