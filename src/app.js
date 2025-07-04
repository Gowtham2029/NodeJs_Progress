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
        res.status(500).send("Internal Server Error" + err.message);
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


// update user by id
app.patch("/user/:userId", async (req, res) => {
    const userId = req.params.userId;
    const data = req.body;

    try{
        const ALLOWED_UPDATES = ["photoUrl", "about", "skills", "gender", "age"]

        const isUpdateAllowed = Object.keys(data).every((k) => ALLOWED_UPDATES.includes(k));
        if(!isUpdateAllowed){
            throw new Error("Invalid update fields");
        }

        const user = await User.findByIdAndUpdate(userId, data, {runValidators:true})
        res.send("User updated successfully");
    }
    catch(err){
        res.status(400).send("Something went wrong" + err.message);
    }
})

// update user by emailId
// app.patch("/user", async (req, res) => {
//     const userEmail = req.body.emailId;
//     const data = req.body;

//     try{
//         const user = await User.findOneAndUpdate({emailId: userEmail}, data);
//         res.send("User updated successfully");
//     }
//     catch(err){
//         console.error("Error updating user: ", err);
//         res.status(400).send("Something went wrong");
//     }
// })

// delete user
app.delete("/user", async (req, res) => {
    const userId = req.body.userId;

    try{
       await User.findByIdAndDelete(userId);
       
       res.send("User deleted successfully");
    }
    catch(err){
        console.error("Error deleting user: ", err);
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
