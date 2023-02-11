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
        if (user) {
          next()
        }
        else {
          res.redirect('/worker/login')
        }
      }
      catch (err) {
        res.send(err)
      }
    });
  } else {
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
          next()
        }
        else {
          res.redirect('/client/login')
        }
      }
      catch (err) {
        res.send(err)
      }
    });
  } else {
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
          next()
        }
        else {
          res.redirect('/admin/login')
        }
      }
      catch (err) {
        res.send(err)
      }
    });
  } else {
    res.redirect('/admin/login')
  }
};

module.exports = { checkClient, checkWorker, checkAdmin };