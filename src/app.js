const express = require("express");
const app = express();

app.use("/hello", (req, res) => {
    res.send("Hello, Everyone welcome...")
})

app.use("/test", (req, res) => {
    res.send("This is a test route!");
})

app.use("/", (req, res) => {
    res.send("Namaste Gowtham!");
})





app.listen(3000, () => {
    console.log("Server is running on port 3000");
})