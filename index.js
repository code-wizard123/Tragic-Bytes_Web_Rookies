const express = require('express');
const mongoose = require('mongoose');
const workerRoutes = require('./routes/workerRoutes');
const clientRoutes = require('./routes/clientRoutes')
const cookieParser = require('cookie-parser');
const { checkClient, checkWorker } = require('./middleware/authMiddleware');

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

app.get('/', (req,res) =>{
  res.render('home')
})

app.get('/login' , (req,res) =>{
  res.render('login')
})

app.get('/signup' , (req,res) =>{
  res.render('signup')
})

app.get('/login2', (req,res) =>{
  res.render('login2')
})

app.get('/signup2' , (req,res) =>{
  res.render('signup2')
})

app.get('/welcome', checkWorker, (req,res) =>{
  res.render('protected')
})

app.get('/welcome2' , checkClient, (req,res) =>{
  res.render('protected2')
})

app.get('/logout' , (req,res) =>{
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
})

app.use((req, res) => {
    console.log("Use working")
});

app.listen(6100 , () =>{
  console.log("0610 ready to serve you master !!");
})