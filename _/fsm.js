
const parser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const fs = require('fs');

const pocketbase = require('./lib/pocketbase.js');
const gql = require('./lib/gql.js');

// ROUTES
const auth = require('./routes/auth.js');
const conversion_trackers = require('./routes/conversion_trackers.js');
const dco = require('./routes/dco.js');
const pdf = require('./routes/pdf.js');

const fsm = express()

const checkAuth = (req, res, next) => {
  if(!req.headers.auth) {
    res.sendStatus(401)
  } else {
    next()
  }
}

fsm.use(parser.json());
fsm.use(morgan(':method :url :status :res[content-length] :response-time ms'));

fsm.use('/auth', auth)
fsm.use('/conversion_trackers/', checkAuth, conversion_trackers)
fsm.use('/dco/', dco)
fsm.use('/pdf/', pdf)


pocketbase('dojo_workspaces').then(workspaces => {
  if(workspaces.length) {
    for(let w in workspaces) {
      let advertisers = workspaces[w].advertisers.join(',')
      gql(workspaces[w],`
        query Advertisers {
          advertisers(filterBy: {
            ids: [${advertisers}]
          }) {
            nodes { id name }
          }
        }
      `).then(data => {
        if(data) {
          workspaces[w].advertisers = data.nodes || []
          fs.writeFileSync('./db/' + workspaces[w].id + '.json', JSON.stringify(workspaces[w], null, 2))
        }
      })
    }
    
  }
})
fsm.listen(3030)