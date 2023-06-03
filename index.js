const express = require("express");
const app = express();
require("dotenv").config()
const cors = require("cors");
const { connection } = require("./config/db");
const { userRouter } = require("./Routes/user.routes");
const { adRouter } = require("./Routes/ad.routes");
app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.send("OLX Homepage")
})

app.use("/",userRouter)
app.use("/",adRouter)

app.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log("Connected to the Database")
        console.log("Connected to the server")
    } catch (error) {
        console.log({Message:"Error while making connection to the server and database",err:error})
    }
})