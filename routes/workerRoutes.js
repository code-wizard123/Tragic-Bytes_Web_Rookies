const { Router } = require('express');

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Worker = require('../models/worker')
const router = Router();

const createToken = (id) => {
  return jwt.sign({ id }, 'apna secret', {
    expiresIn: 3 * 24 * 60 * 60
  });
};

router.post('/signup',async(req,res) =>{
    const salt = await bcrypt.genSalt(12)
    pass = req.body.password
    console.log(pass, req.body.username)
    const hashp = await bcrypt.hash(pass, salt);
    try{
        const newWorker = new Worker({
            username : req.body.username,
            email : req.body.email,
            password : hashp
        })
        await newWorker.save()
        res.redirect('/')
    }
    catch(err){
        res.send(err)
    }
})

router.post('/login', async(req,res) =>{
    const user  = await Worker.findOne({username : req.body.username})
    if(user)
    {
        const match = await bcrypt.compare(req.body.password,user.password)
        if(match)
        {
            const token = createToken(user._id)
            res.cookie('jwt', token, {maxage : 3 * 24 * 60 * 60 * 1000 })
            res.redirect('/welcome')
        }
        else{
            res.redirect('/login')
        }
    }
    else{
        res.send("Aap exist nhi karte")
    }
})

module.exports = router;