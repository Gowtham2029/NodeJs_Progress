const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json());

app.post("/signup", async (req, res) =>{
    // const userObj = {
    //     firstName: "Ram",
    //     lastName:"Sita",
    //     emailId: "SitaRam@gmail.com",
    //     password: "password143",
    //     age: 25,
    //     gender: "Female",
    // }
    // const userObj = req.body;
    const user = new User(req.body);

    try{
       await user.save();
       res.send("User created successfully");
    }
    catch(err){
        console.error("Error creating user: ", err);
        res.status(500).send("Internal Server Error");
    }
   

})


// to get only one user by emailId
app.get("/user", async (req, res) => {
    const userEmail = req.body.emailId;

    try{
        const user = await User.find({emailId: userEmail})
        res.send(user); 
    }
    catch(err){
        console.error("Error fetching user: ", err);
        res.status(400).send("Something went wrong");
    }
})

// to get all users
app.get("/feed", async (req, res) => {
    

    try{
        const users = await User.find({})
        res.send(users);
    }
    catch(err){
        console.error("Error fetching users: ", err);
        res.status(400).send("Something went wrong");
    }

})


connectDB()
.then(() => {
    console.log("Database connected successfully");
    app.listen(3000, () => {
    console.log("Server is running on port 3000");
})
})
.catch((err) =>{
    console.error("Database connection failed: ", err);
})
