const express = require('express');
const puppeteer = require('puppeteer');
const color = require('cli-color');
// const _ = require('underscore');

const pb = require('../lib/pocketbase.js');
const delay = require('../lib/delay.js');
const config = require('../config.json');

const route = express.Router();

route.get('/', (req, res) => {
  let counter = 0
  pb('html5_banners')
  .then(banners => {
    for(let b in banners) {
      banners[b].preview = '/fsm/dco/preview/' + banners[b].id
    }
    res.send(banners)
  })
})

route.get('/preview/:id', (req, res) => {
  const id = req.params.id
  if(!id) {
    res.sendStatus(400)
  } else {
    pb('html5_banners', id)
    .then(async(banner) => {
      console.log(banner)
      if(!banner) {
        res.sendStatus(404)
      } else {

        const browser = await puppeteer.launch(config.puppeteer);
        const [page] = await browser.pages();

        await page.setViewport({
          width: 300,
          height: 250,
          deviceScaleFactor: 2
        });

        try {
          await page.goto(banner.url, {
            waitUntil: 'networkidle0'
          })

          await delay(5000)
          
          let render = await page.screenshot({
            type: 'jpeg'
          })

          // render = 'data:image/jpg;base64,' + render.toString('base64')
          res.writeHead(200, {
            'Content-Type': 'image/png',
            'Content-Length': render.length
          });
          res.end(render);
          // res.send(render)
        }

        catch(err){
          res.sendStatus(500)
          console.log(color.red(err))
        }

      }
    })
  }
})

module.exports = route