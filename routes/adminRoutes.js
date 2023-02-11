const { Router } = require('express');

const { checkAdmin } = require('../middleware/authMiddleware');

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Worker = require('../models/worker')
const router = Router();

const createToken = (id) => {
    return jwt.sign({ id }, 'apna secret', {
        expiresIn: 3 * 24 * 60 * 60
    });
};

router.get('/admin/login', (req, res) => {
    res.send("Aao admin welcome")
})

router.get('/admin/welcome', checkAdmin, (req, res) => {
    res.render('admin')
})
