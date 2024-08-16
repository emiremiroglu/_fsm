const post = require('../lib/post');
const color = require('cli-color');
const express = require('express');

const route = express.Router();

route.post('/', (req, res) => {
  let email = req.body.email
  let password = req.body.password

  if(!(email && password)) {
    res.sendStatus(400)
  } else {
    post('https://pocketbase.rmtx.dev/api/collections/dojo_users/auth-with-password?expand=workspaces', {
      identity: email,
      password: password
    })
    .then((data) => {
      res.send({
        id: data.record.id,
        name: data.record.name,
        email: data.record.email,
        token: data.token,
        workspaces: data.record.expand.workspaces
      })
    })
    .catch((err) => {
      console.log(err);
    });
  }
})

module.exports = route