const express = require('express');
const db = require('./db/connection')
const app = express();

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`The express is running in the port ${PORT}`);
})

// db connection
db.authenticate().then(()=>{
    console.log("Conected successfully with the database ")
}).catch(err => {
    console.log("Failed to connect the database", err)
});

// Routes
app.get('/', (req, ans) => {
    ans.send("It's working");
});