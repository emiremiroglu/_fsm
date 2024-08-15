const pb = require('../lib/pocketbase');

const express = require('express');
const cheerio = require('cheerio');
const color = require('cli-color');
const _ = require('underscore');

const route = express.Router();

route.get('/', (req, res) => {
  let counter = 0
  pb('conversion_trackers')
  .then(trackers => {
    let checks = []
    for(let t in trackers) {
      checks.push(fetch(trackers[t].website)
      .then(response => response.text())
      .then(body => {
        let tracker = {}
        let found = []
        const $ = cheerio.load(body);
        let scripts = $('script')
        scripts.each((i, tag) => {
          let filename = trackers[t].filename + '.js'
          let src = $(tag).attr('src')
          if(src) {
            if(src.search(filename)>0) {
              found.push(src)
            }
          }
        });

        tracker.id = trackers[t].id
        tracker.filename = trackers[t].filename
        tracker.name = trackers[t].name
        tracker.website = trackers[t].website
        
        if(found.length) {
          tracker.script = found[0]        
          tracker.status = true
        }

        let log = [counter++, tracker.name, tracker.code].join(' ')

        if(tracker.script) {
          console.log(color.green(log))
        } else {
          console.log(color.black(log))
        }

        return tracker
      }))
    }

    Promise.all(checks).then(trackers => {
      trackers = _.sortBy(trackers, 'status')
      res.send(trackers)
    })
    
  })
})

route.get('/:id', (req, res) => {
  console.log(req.params.id)
  const id = req.params.id
  if(!id) {
    res.sendStatus(400)
  } else {
    pb('conversion_trackers', id)
    .then(data => {
      res.send(data)
    })
  }
})

route.post('/:id', (req, res) => {
  console.log(req.params.id)
  const id = req.params.id
  if(!id) {
    res.sendStatus(400)
  } else {
    pb('conversion_trackers', id)
    .then(data => {
      res.send(data)
    })
  }
})

module.exports = route