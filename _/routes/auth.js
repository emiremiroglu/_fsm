const post = require('../lib/post');
const express = require('express');

const route = express.Router();

route.post('/', (req, res) => {
  let email = req.body.email
  let password = req.body.password

  if(!(email && password)) {
    res.sendStatus(400)
  } else {
    post('https://pocketbase.rmtx.dev/api/collections/dojo_users/auth-with-password', {
      identity: email,
      password: password
    })
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      console.log(err);
    });

  }
})

module.exports = route