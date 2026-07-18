const express = require("express");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const connectDb = require("./config/db");

dotenv.config();
const app = express();

connectDb();
app.use(express.json());
app.use("/api/users",userRoutes);
app.get("/",async(req,res)=>{
    res.send("health route")
})
const PORT = process.env.PORT || 5000;
app.listen( PORT, ()=>{
  console.log("server is running on port",PORT);
})
