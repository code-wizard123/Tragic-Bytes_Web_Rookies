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

router.get('/client/update', checkClient, (req, res) => {
    const token = req.cookies.jwt
    jwt.verify(token, 'apna secret', async(err,decodedToken) =>{
        if(err)
        {
            res.send(err)
        }
        else{
            let client = await Client.findById(decodedToken.id)
            res.render('clientupdate',{client})
        }
    })
})

router.get('/client/raiseissue' , checkClient, (req,res) =>{
    const token = req.cookies.jwt
    jwt.verify(token, 'apna secret', async(err,decodedToken) =>{
        if(err)
        {
            res.send(err)
        }
        else{
            let client = await Client.findById(decodedToken.id)
            res.render('clientraise',{client})
        }
    })
})

router.get('/client/nego', checkClient, (req, res) => {
    const token = req.cookies.jwt
    jwt.verify(token, 'apna secret', async(err,decodedToken) =>{
        if(err)
        {
            res.send(err)
        }
        else{
            let client = await Client.findById(decodedToken.id)
            res.render('clientnego',{client})
        }
    })
})

router.get('/client/viewissue', checkClient, (req, res) => {
    const token = req.cookies.jwt
    jwt.verify(token, 'apna secret', async(err,decodedToken) =>{
        if(err)
        {
            res.send(err)
        }
        else{
            let client = await Client.findById(decodedToken.id)
            res.render('clientviewissue',{client})
        }
    })
})

router.post('/client/update' , checkClient, (req,res) =>{
    const token = req.cookies.jwt
    jwt.verify(token, 'apna secret', async(err,decodedToken) =>{
        if(err)
        {
            res.send(err)
        }
        else{
            const client = await Client.findById(decodedToken.id)
            client.cname = req.body.cname
            client.cemail = req.body.cemail
            client.cnumber = req.body.cnumber
            await client.save()
            res.redirect('/client/update')
        }
    })
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
            res.redirect('/client/raiseissue')
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