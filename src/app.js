const express = require("express");
const app = express();


app.get("/user", (req, res) => {
    res.send({firstName:"Gowtham", lastName:"kishore"})
})


app.post("/user", (req, res) => {
    res.send("Data successfully saved to Database!");
})

app.delete("/user", (req, res) => {
    res.send("Deleted successfully");
})


app.use("/test", (req, res) => {
    res.send("This is a test route!");
})

// app.use("/hello", (req, res) => {
//     res.send("Hello, Everyone welcome...")
// })

// app.use("/", (req, res) => {
//     res.send("Namaste Gowtham!");
// })

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})