const express = require("express");
const app = express();

// url: localhost:3000/user?firstName=Gowtham&lastName=kishore
app.get("/user", (req, res) => {
    console.log(req.query)   // Output: { firstName: 'Gowtham', lastName: 'kishore' }
    res.send({firstName:"Gowtham", lastName:"kishore"})
})

// url: localhost:3000/user/12345
app.get("/user/:userId", (req, res) => {
    console.log(req.params)  // Output: { userId: '12345' }
    res.send({firstName:"Gowtham", lastName:"kishore"})
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})