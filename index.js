const express = require('express');
const mongoose = require('mongoose');
const workerRoutes = require('./routes/workerRoutes');
const clientRoutes = require('./routes/clientRoutes');
const adminRoutes = require('./routes/adminRoutes')
const cookieParser = require('cookie-parser');
const { checkClient, checkWorker, checkAdmin } = require('./middleware/authMiddleware');

const app = express();

// middleware
app.use(express.urlencoded({extended : true}))
app.use(express.static('public'));
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb://127.0.0.1:27017/test06';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then(() => console.log("Mongo up"))
  .catch((err) => console.log(err));

app.use('/' ,workerRoutes);
app.use('/', clientRoutes );
// app.use('/' , adminRoutes)

app.get('/', (req,res) =>{
  res.render('home')
})

app.get('/login' , (req,res) =>{
  res.render('workerlogin')
})

app.get('/signup' , (req,res) =>{
  res.render('workersignup')
})

app.get('/login2', (req,res) =>{
  res.render('clientlogin')
})

app.get('/signup2' , (req,res) =>{
  res.render('clientsignup')
})

app.get('/welcome', checkWorker, (req,res) =>{
  res.render('protected')
})

app.get('/welcome2' , checkClient, (req,res) =>{
  res.render('protected2')
})

app.get('/admin/login' , (req,res) =>{
  res.render('admin-login')
})

app.get('/admin' , checkAdmin, (req,res) =>{
  res.render('admin')
})

app.get('/logout' , (req,res) =>{
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
})

app.use((req, res) => {
    console.log("Use working")
});

app.listen(6100 , () =>{
  console.log("6100 ready to serve you master !!");
})
