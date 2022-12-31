const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const PORT = 8001
const cors = require("cors")


const url = "mongodb://0.0.0.0:27017/forms"
app.use(express.json())
app.use(cors())

const router = require("./Router")
app.use("/", router);
app.use(express.static(path.join(__dirname, "Files")));


mongoose.connect(url, (err) => {
    if(err){
        console.log(err);
    }
    else{
        console.log("DataBase Connected Successfully");
    }
});

app.use("*", (req, res) => {
    res.send("<h1>404 Not Found</h1>")
})

app.listen(PORT,(err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("server started on 8001");
    }
})