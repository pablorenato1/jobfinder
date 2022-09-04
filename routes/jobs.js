const express = require('express');
const Job = require('../models/Job');

const router = express.Router();

// test
router.get('/test', (req, ans) => {
    ans.send('The router works')
});

router.get('/add',(req, ans) => {
    ans.render('add')
})

// add job by post
router.post('/add', (req, ans)=> {
    // console.log("1")
    let {title,salary,company,description,email,new_job} = req.body;
    // console.log("2")

    // insert 
    Job.create({
        title,
        description,
        salary,
        company,
        new_job,
        email
    })
    .then(() => {
        // ans.redirect('/')
        ans.send("sql added")
    })
    .catch(err => console.log(err));

})

module.exports = router