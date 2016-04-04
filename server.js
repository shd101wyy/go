'use strict'

let express = require('express'),
    app = express(),
    http = require('http').Server(app),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    db_User = require('./schema/User.js'),
    io = require('socket.io')(http)


app.use(session({
  secret: '1234567890QWERTY',
}))

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/www'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/www/index.html')
})

app.get('/auth', function(req, res) {
  if (req.session.userId) {
    res.json({success: true, userId: req.session.userId})
  } else {
    res.send('null')
  }
})

app.post('/signin', function(req, res) {
  console.log(req.session.userId)
  let post = req.body,
      email = post.email,
      password = post.password

  if (password) password = encrypt(password)

  db_User.find({email, password}, function(error, users) {
    if (error || !users || users.length === 0) {
      console.log('signin error')
      res.send('null')
    } else {
      console.log('signin successfully')
      req.session.userId = users[0].userId
      res.json({success: true, userId: users[0].userId})
    }
  })
})

app.post('/signup', function(req, res) {
  let post = req.body,
      email = post.email,
      password = post.password,
      userId = post.userId

  if (password) password = encrypt(password)

  let newUser = db_User({
    email,
    password,
    userId
  })

  newUser.save(function(error) {
    if (error) {
      console.log('signup error', error)
      res.send('null')
    } else {
      console.log('signup successfully')
      req.session.userId = userId
      res.json({success: true})
    }
  })
})

app.get('/logout', function(req, res) {
  delete(req.session.userId)
  res.send({success: true})
})

// socket.io
io.on('connection', function(socket) {

})




// start server
http.listen(31000, function(){
  console.log('listening on *:31000')
})
