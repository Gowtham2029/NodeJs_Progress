const express = require("express");
const app = express();

const { adminAuth, userAuth } = require("./middlewares/auth")

app.use("/admin", adminAuth)


app.get("/user", userAuth, (req, res) => {
    res.send("Welcome to the user page");
})
app.get("/admin/getAllDetails", (req, res) => {
    res.send("Welcome to the user page");
})

app.get("/admin/DeleteUser", (req, res) => {
    res.send("Deleted a user");
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})