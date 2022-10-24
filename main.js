const bodyParser = require('body-parser');
const { engine } = require('express-handlebars');
const express = require('express');
const path = require('path');
const db = require('./db/connection');
const Job = require('./models/Job')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const app = express();

const PORT = 3000;

// Know if the express is running
app.listen(PORT, () => {
    console.log(`The express is running in the port ${PORT}`);
})

// Handle bars
app.set('views', path.join(__dirname, 'views'));
app.engine("handlebars", engine({defaultLayout: 'main'}));
app.set("view engine", "handlebars");

// Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// body parser
app.use(bodyParser.urlencoded({extended: false}));

// db connection (Promises)
db.authenticate().then(()=>{
    console.log("Connected successfully with the database ")
}).catch(err => {
    console.log("Failed to connect the database", err)
});

// Routes of sites
app.get('/', (req, ans) => {

    let search = req.query.job;
    let query = '%'+search+'%'; // Its just to say to the Sequelize to search attribute similar at what we are searching

    if(!search) {
        Job.findAll({order: [ // Function from Sequelize return a promise
            ['createdAt', 'DESC']
        ]}).then(jobs => {
    
            ans.render('index', {
                jobs
            });
        }).catch(err => console.log(err));
    } else {
        Job.findAll({
            where: {title: {[Op.like]: query}},
            order: [ // Function from Sequelize
                ['createdAt', 'DESC']
        ]}).then(jobs => {
            ans.render('index', {
                jobs, search
            });
    
        });
    };
    
});

// jobs routes
app.use('/jobs', require('./routes/jobs'));
