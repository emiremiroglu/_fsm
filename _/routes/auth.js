const post = require('../lib/post');
const express = require('express');
const fs = require('fs');

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
      let workspaces = data.record.expand.workspaces

          workspaces = workspaces.map(workspace => {
            workspace.advertisers = workspace.advertisers.map(aid => {
              try {
                let advertiser = JSON.parse(fs.readFileSync('./db/advertisers/' + aid + '.json', 'utf-8'))
                if(advertiser) {
                  advertiser.line_items = advertiser.all_line_item_ids.map(lid => {
                    try{
                      let line_item = JSON.parse(fs.readFileSync('./db/line_items/' + lid + '.json', 'utf-8'))
                      return line_item
                    }
                    catch(err) {
                      console.log(err)
                    }
                  })
                }
                return advertiser
              }
              catch(err) {
                console.log(err)
              }
              
            })
            return workspace
          })

      console.log(workspaces)

      res.send({
        id: data.record.id,
        name: data.record.name,
        email: data.record.email,
        token: data.token,
        workspaces: workspaces
      })
    })
    .catch((err) => {
      console.log(err);
    });
  }
})

module.exports = route