const { Router } = require('express');

const { checkClient} = require('../middleware/authMiddleware');

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Client = require('../models/client')
const router = Router();

const createToken = (id) => {
    return jwt.sign({ id }, 'apna secret', {
        expiresIn: 3 * 24 * 60 * 60
    });
};

router.get('/client/login', (req, res) => {
    res.render('clientlogin')
})

router.get('/client/signup', (req, res) => {
    res.render('clientsignup')
})

router.get('/client/welcome', checkClient, (req, res) => {
    res.render('protected2')
})

router.post('/client/signup', async (req, res) => {
    const salt = await bcrypt.genSalt(12)
    pass = req.body.password
    const hashp = await bcrypt.hash(pass, salt);
    try {
        const newClient = new Client({
            cusername: req.body.username,
            cemail: req.body.email,
            cpassword: hashp,
            cname : req.body.name,
            caddress : req.body.address,
            cpincode : req.body.pincode,
            cnumber : req.body.number,
        })
        await newClient.save()
        res.redirect('/')
    }
    catch (err) {
        res.send(err)
    }
})

router.post('/client/login', async (req, res) => {
    const user = await Client.findOne({ cusername: req.body.username })
    if (user) {
        const match = await bcrypt.compare(req.body.password, user.cpassword)
        if (match) {
            const token = createToken(user._id)
            res.cookie('jwt', token, { maxage: 3 * 24 * 60 * 60 * 1000 })
            res.redirect('/client/welcome')
        }
        else {
            res.redirect('/client/login')
        }
    }
    else {
        res.send("Aap exist nhi karte")
    }
})

module.exports = router;