const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const db = require('./db/connection');

const PORT = 3000;

// Know if the express is running
app.listen(PORT, () => {
    console.log(`The express is running in the port ${PORT}`);
})

// body parser
app.use(bodyParser.urlencoded({extended: false}));

// db connection (Promisse)
db.authenticate().then(()=>{
    console.log("Conected successfully with the database ")
}).catch(err => {
    console.log("Failed to connect the database", err)
});

// Routes of sites
app.get('/', (req, ans) => {
    ans.send("It's working");
});

// jobs routes
app.use('/jobs', require('./routes/jobs'));
