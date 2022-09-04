const bodyParser = require('body-parser');
const { engine } = require('express-handlebars');
const express = require('express');
const path = require('path');
const db = require('./db/connection');
const Job = require('./models/Job')

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

// db connection (Promisse)
db.authenticate().then(()=>{
    console.log("Conected successfully with the database ")
}).catch(err => {
    console.log("Failed to connect the database", err)
});

// Routes of sites
app.get('/', (req, ans) => {
    
    Job.findAll({order: [ // Function from Sequelize
        ['createdAt', 'DESC']
    ]}).then(jobs => {

        ans.render('index', {
            jobs
        });

    })
});

// jobs routes
app.use('/jobs', require('./routes/jobs'));
