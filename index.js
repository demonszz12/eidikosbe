const express = require("express");
let jwt = require('jsonwebtoken');
let cors = require("cors");
const bcrypt = require('bcrypt');
require("dotenv").config()
const PORT = process.env.PORT || 8080;

const { connection } = require("./config/db");
const { UserModel } = require("./models/UserModel");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.send("welcome")
})

app.post("/signup",async (req,res)=>{
    let {username,password,category}=req.body;
    bcrypt.hash(password,6).then(async function(hash){
        const user = new UserModel({username,password:hash,category})
        await user.save()
        res.send({"msg":"Sign up Successfull"})
    })
    .catch(()=>{
        res.send({"msg":"something went wrong"})
    })
})

app.post("/login",async (req,res)=>{
    let {username,password} = req.body;
    let user = await UserModel.findOne({username})
    console.log(user);
    let hash = user.password;
    bcrypt.compare(password,hash,function(err,result){
        if(result){
            var token = jwt.sign({username:username},'secret');
            console.log(token);
            res.send({"user":req.body.username,"category":user.category,"msg":"login successfull","token":token})
        }
        else{
            res.send("Login failed, invalid credentials")
        }
    })
})
 


app.listen(PORT,async ()=>{
    try{
        await connection
        console.log("connected to DB successfully")
    }
    catch(err){
        console.log("err connection to db")
        console.log(err)
    }
    console.log(`listing on PORT ${PORT}`)
})