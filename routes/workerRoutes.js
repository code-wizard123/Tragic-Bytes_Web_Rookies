const { Router } = require('express');

const {checkWorker} = require('../middleware/authMiddleware');

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Worker = require('../models/worker')
const router = Router();

const createToken = (id) => {
    return jwt.sign({ id }, 'apna secret', {
        expiresIn: 3 * 24 * 60 * 60
    });
};

router.get('/worker/login', (req, res) => {
    res.render('workerlogin')
})

router.get('/worker/signup', (req, res) => {
    res.render('workersignup')
})

router.get('/worker/welcome', checkWorker, (req, res) => {
    res.render('protected')
})

router.post('/worker/signup', async (req, res) => {
    const salt = await bcrypt.genSalt(12)
    pass = req.body.password
    console.log(pass, req.body.username)
    const hashp = await bcrypt.hash(pass, salt);
    try {
        const newWorker = new Worker({
            name : req.body.name,
            photoid : req.body.filelink,
            number : req.body.number,
            workexp : req.body.workexp,
            username: req.body.username,
            email: req.body.email,
            password: hashp
        })
        await newWorker.save()
        res.redirect('/')
    }
    catch (err) {
        res.send(err)
    }
})

router.post('/worker/login', async (req, res) => {
    const user = await Worker.findOne({ username: req.body.username })
    if (user) {
        const match = await bcrypt.compare(req.body.password, user.password)
        if (match) {
            const token = createToken(user._id)
            res.cookie('jwt', token, { maxage: 3 * 24 * 60 * 60 * 1000 })
            res.redirect('/worker/welcome')
        }
        else {
            res.redirect('/worker/login')
        }
    }
    else {
        res.send("Worker doesnt exist please signup")
    }
})

module.exports = router;