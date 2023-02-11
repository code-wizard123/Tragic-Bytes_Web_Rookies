const { Router } = require('express');

const { checkAdmin } = require('../middleware/authMiddleware');

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Admin = require('../models/admin')
const router = Router();

const Worker = require('../models/worker')
const Req = require('../models/req')

const createToken = (id) => {
    return jwt.sign({ id }, 'apna secret', {
        expiresIn: 3 * 24 * 60 * 60
    });
};

router.get('/admin/login', (req, res) => {
    res.render('admin-login')
})

router.get('/admin/welcome', checkAdmin, (req, res) => {
    res.render('admin')
})

router.post('/admin/login' , async(req,res) =>{
    const user = await Admin.findOne({ username: req.body.username })
    if (user) {
        const match = await bcrypt.compare(req.body.password, user.password)
        if (match) {
            const token = createToken(user._id)
            res.cookie('jwt', token, { maxage: 3 * 24 * 60 * 60 * 1000 })
            res.redirect('/admin/validate')
        }
        else {
            res.redirect('/admin/login')
        }
    }
    else {
        res.send("You are not authorized")
    }
})

router.get('/admin/validate', checkAdmin , async(req,res) =>{
    Worker.find({isValid : false}, (err,data) =>{
        if(err)
        {
            res.send(err)
        }
        else{
            res.render('adminvalid', {data})
        }
    })
})

router.get('/admin/logs' , checkAdmin , async(req,res) =>{
    Req.find({isMatched: true},(err,data) =>{
        if(err)
        {
            res.send(err)
        }
        else{
            res.render('adminlogs',{data})
        }
    })
})

router.post('/admin/valid/worker/:id', checkAdmin, async(req,res) =>{
    const {id} = req.params
    const rwk = await Worker.findById(id)
    rwk.isValid = !rwk.isValid
    await rwk.save()
    res.redirect('/admin/validate')
})

module.exports = router;
