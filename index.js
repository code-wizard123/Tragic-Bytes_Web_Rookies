const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }))
const path = require('path')
const http = require("http").createServer(app);
const io = require('socket.io')(http);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))
app.use(express.static('public'));

io.on('connection', function(socket){
    socket.on("newuser", function(username){
        socket.broadcast.emit("update", username + " joined the conversation");
    });
    socket.on("newuser", function(username){
        socket.broadcast.emit("update", username + " left the conversation");
    });
    socket.on("newuser", function(message){
        socket.broadcast.emit("chat", message);
    });
})

app.get('/', (req, res) => {
    res.render('home');
})

app.get('/login', (req, res) => {
    res.render('login');
})

app.get('/signup', (req, res) => {
    res.render('signup');
})

app.post('/login', (req, res) => {
    const data = req.body;
    res.send(data);
})

app.get('/pincode', (req, res) => {
    res.render('pincode');
})

app.get('/chat', (req, res) => {
    res.render('chat');
})

app.all('*', (req, res) => {
    res.status(404).send('notfound')
})

app.use((req, res) => {
    console.log('Use Working');
})

// app.listen(6100, () => {
//     console.log("3000 port serving");
// });

http.listen(6100, () => {
    console.log("Server listening on 6100")
})