const { Router } = require('express');

const { checkAdmin } = require('../middleware/authMiddleware');

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Admin = require('../models/admin')
const router = Router();

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
            res.redirect('/admin/welcome')
        }
        else {
            res.redirect('/admin/login')
        }
    }
    else {
        res.send("You are not authorized")
    }
})

module.exports = router;
