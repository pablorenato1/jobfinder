const express = require('express');
const Job = require('../models/Job');

const router = express.Router();


router.get('/add',(req, ans) => {
    ans.render('add')
})

// Job detail -> view/1. view/2
router.get('/view/:id',  (req, ans) => Job.findOne({
    where: {id: req.params.id}
}).then(job => {
    ans.render('view', {
        job
    });
}).catch(err => console.log(err)));

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
    .then(() => {
        ans.redirect('/')

    })
    .catch(err => console.log(err));

})

module.exports = router