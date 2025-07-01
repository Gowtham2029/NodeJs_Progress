const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.post("/signup", async (req, res) =>{
    const userObj = {
        firstName: "Ram",
        lastName:"Sita",
        emailId: "SitaRam@gmail.com",
        password: "password143",
        age: 25,
        gender: "Female",
    }

    const user = new User(userObj);

    try{
       await user.save();
       res.send("User created successfully");
    }
    catch(err){
        console.error("Error creating user: ", err);
        res.status(500).send("Internal Server Error");
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
