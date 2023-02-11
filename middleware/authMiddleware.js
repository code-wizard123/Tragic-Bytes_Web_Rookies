const jwt = require('jsonwebtoken');
const Worker = require('../models/worker');
const Client = require('../models/client')
const Admin = require('../models/admin')

const checkWorker = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, 'apna secret', async (err, decodedToken) => {
      try {
        let user = await Worker.findById(decodedToken.id);
        if (user.isValid) {
          res.locals.worker = user
          next()
        }
        else if(!user.isValid){
          res.redirect('/notvalid')
        }
        else {
          res.cookie('jwt', '', { maxAge: 1 })
          res.locals.worker = null
          res.redirect('/worker/login')
        }
      }
      catch (err) {
        res.cookie('jwt', '', { maxAge: 1 })
        res.locals.worker = null
        res.send(err)
      }
    });
  } else {
    res.cookie('jwt', '', { maxAge: 1 })
    res.locals.worker = null
    res.redirect('/worker/login')
  }
};

const checkClient = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, 'apna secret', async (err, decodedToken) => {
      try {
        let user = await Client.findById(decodedToken.id);
        if (user) {
          res.locals.client = user
          next()
        }
        else {
          res.cookie('jwt', '', { maxAge: 1 })
          res.locals.client = null
          res.redirect('/client/login')
        }
      }
      catch (err) {
        res.cookie('jwt', '', { maxAge: 1 })
        res.locals.client = null
        res.send(err)
      }
    });
  } else {
    res.cookie('jwt', '', { maxAge: 1 })
    res.locals.client = null
    res.redirect('/client/login')
  }
};

const checkAdmin = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, 'apna secret', async (err, decodedToken) => {
      try {
        let user = await Admin.findById(decodedToken.id);
        if (user) {
          res.locals.admin = user
          next()
        }
        else {
          res.cookie('jwt', '', { maxAge: 1 })
          res.locals.admin = null
          res.redirect('/admin/login')
        }
      }
      catch (err) {
        res.cookie('jwt', '', { maxAge: 1 })
        res.locals.admin = null
        res.send(err)
      }
    });
  } else {
    res.cookie('jwt', '', { maxAge: 1 })
    res.locals.admin = null
    res.redirect('/admin/login')
  }
};

module.exports = { checkClient, checkWorker, checkAdmin };