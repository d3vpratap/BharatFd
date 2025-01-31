const express =  require('express');
const router = express.Router();
const FAQ = require('../models/faqModel');




router.get('/',(req,res)=>{
    // res.send("Hello");
    res.render('admin');
})







module.exports  = router;