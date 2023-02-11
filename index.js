const express = require('express');
const app = express();
app.use(express.urlencoded({extended : true}))
const mongoose = require('mongoose');
const path = require('path')

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))
app.use(express.static('public'));

mongoose.connect('mongodb://127.0.0.1:27017/workconnect')
.then(() => console.log('Mongoup'))
.catch(e => console.log(e));

app.get('/', (req, res) => {
    res.send('home page');
})

app.get('/login', (req, res) => {
    res.render('login');
})

app.get('/signup', (req, res) => {
    res.send('signup page');
})

app.post('/login', (req, res) => {
    const data = req.body;
    res.send(data);
})

app.all('*', (req,res)=>{
    res.status(404).send('notfound')
})

app.use((req, res) => {
    console.log('Use Working');
})

app.listen(6100, () => {
    console.log("3000 port serving");
});