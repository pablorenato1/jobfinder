const express = require('express');
const Job = require('../models/Job');

const router = express.Router();

// test
router.get('/test', (req, ans) => {
    ans.send('The router works')
});


// add job by post
router.post('/add', (req, ans)=> {

    let {title,salary,company,description,email,new_job} = req.body;

    // insert 
    Job.create({
        title,
        description,
        salary,
        company,
        new_job,
        email
    })
    .then(() => ans.redirect('/'))
    .catch(err => console.log(err));

})

module.exports = router