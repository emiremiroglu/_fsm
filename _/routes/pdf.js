// PDF
const config = require('../config.json');

const express = require('express');
const puppeteer = require('puppeteer');
const PDFDocument = require('pdfkit');
const shortid = require('shortid');
const moment = require('moment');
const slug = require('slug');
const fs = require('fs');

const route = express.Router();

const month = moment().format('MMMM')

route.get('/:wid', async(req, res) => {

  let wid = req.params.wid
  let workspace = JSON.parse(fs.readFileSync('./db/' + wid + '.json', 'utf-8'))

  workspace.advertisers = workspace.advertisers.map(advertiser => {
    try {
      advertiser = JSON.parse(fs.readFileSync('./db/advertisers/' + advertiser.id + '.json', 'utf-8'))
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

  const browser = await puppeteer.launch(config.puppeteer);
  const [page] = await browser.pages();

  await page.setViewport({
    width: 1922,
    height: 1486
  });

  let pdf = new PDFDocument({
    margins: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    },
    layout: 'landscape',
    bufferPages: true
  });

  let buffers = [];

  let head = `
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <script src="https://cdn.tailwindcss.com"></script>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=${workspace.css.font}:ital,wght@0,100;0,200;0,300;0,400;0,700;1,100;1,200;1,300&display=swap" rel="stylesheet">
      <style>
        body { font-family: '${workspace.css.font}', sans-serif; color: ${workspace.css.color.light}; }
      </style>
    </head>
  `

  await page.setContent(`
    <!DOCTYPE html>
    <html lang="en">
    ${head}
    <body class="w-screen h-screen bg-[${workspace.css.color.dark}] overflow-y-hidden">
      <section class="flex h-screen w-screen flex-col gap-10 items-center justify-center text-center">
        <h1 class="text-8xl tracking-tight font-bold">${workspace.name}</h1>
        <span class="text-4xl">${month} Screenshots</span>
      <section>
    </body>
    </html>
  `)

  pdf.image((await page.screenshot()).buffer, {
    fit: [pdf.page.width, pdf.page.height]
  })


  for(let a in workspace.advertisers) {
    let advertiser = workspace.advertisers[a]

    if(workspace.advertisers.length > 1) {
      await page.setContent(`
        <!DOCTYPE html>
        <html lang="en">
        ${head}
        <body class="w-screen h-screen bg-[${workspace.css.color.light}] overflow-y-hidden">
          <section class="flex h-screen w-screen flex-col gap-10 items-center justify-center text-center">
            <h1 class="text-6xl tracking-tight font-bold text-[${workspace.css.color.dark}]">${advertiser.name}</h1>
          <section>
        </body>
        </html>
      `)
      
      pdf.addPage(config.pdf)
      pdf.image((await page.screenshot()).buffer, {
        fit: [pdf.page.width, pdf.page.height]
      })
    }

    let line_items = advertiser.line_items

    for(let l in line_items) {

      await page.setContent(`
        <!DOCTYPE html>
        <html lang="en">
        ${head}
        <body class="w-screen h-screen bg-[${workspace.css.color.light}] overflow-y-hidden">
          <section class="flex h-screen w-screen gap-6 items-center justify-center text-center">
            <span class="text-4xl font-bold text-[${workspace.css.color.dark}]">${line_items[l].name}</span>
          <section>
        </body>
        </html>
      `)

      pdf.addPage(config.pdf)

      pdf.image((await page.screenshot()).buffer, {
        fit: [pdf.page.width, pdf.page.height]
      })


    }

  }

  await page.setContent(`
    <!DOCTYPE html>
    <html lang="en">
    ${head}
    <body class="w-screen h-screen bg-[${workspace.css.color.dark}] overflow-y-hidden">
      <section class="flex h-screen w-screen gap-6 items-center justify-center text-center">
        <span class="text-3xl text-[${workspace.css.color.light}]">Generated with</span>
        <svg class="h-16 fill-[${workspace.css.color.light}]" viewBox="0 0 313 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M25 0H145C158.807 0 170 11.1929 170 25V95C170 108.807 158.807 120 145 120H25C11.1929 120 0 108.807 0 95V25C0 11.1929 11.1929 0 25 0ZM25 10C16.7157 10 10 16.7157 10 25V95C10 103.284 16.7157 110 25 110H145C153.284 110 160 103.284 160 95V25C160 16.7157 153.284 10 145 10H25Z"></path>
          <path d="M92.1682 79.4187V40.6216C92.1682 37.5661 94.5842 35.1502 97.6396 35.1502H111.567C127.199 35.1502 138 45.8798 138 59.878V60.0201C138 74.0183 127.199 84.89 111.567 84.89H97.6396C94.5842 84.89 92.1682 82.4741 92.1682 79.4187ZM103.111 75.0131H111.567C120.52 75.0131 126.56 68.9733 126.56 60.1622V60.0201C126.56 51.209 120.52 45.0271 111.567 45.0271H103.111V75.0131Z"></path><path d="M31.6899 80.5378C31.6899 79.7562 31.9742 78.9745 32.3295 78.1929L49.6674 39.0405C50.8753 36.3404 53.0781 34.7061 56.0625 34.7061H56.702C59.6864 34.7061 61.8181 36.3404 63.0261 39.0405L80.3639 78.1929C80.7192 78.9745 80.9324 79.6851 80.9324 80.3957C80.9324 83.309 78.6586 85.6539 75.7453 85.6539C73.1872 85.6539 71.4818 84.1617 70.487 81.8879L67.1474 74.0716H45.2618L41.78 82.2431C40.8563 84.3749 39.0088 85.6539 36.735 85.6539C33.8927 85.6539 31.6899 83.3801 31.6899 80.5378ZM49.3121 64.4079H63.0971L56.2046 47.9937L49.3121 64.4079Z"></path><path d="M286.062 80.44V45.5907H275.472C272.681 45.5907 270.391 43.3008 270.391 40.51C270.391 37.7192 272.681 35.4294 275.472 35.4294H307.673C310.464 35.4294 312.754 37.7192 312.754 40.51C312.754 43.3008 310.464 45.5907 307.673 45.5907H297.082V80.44C297.082 83.517 294.649 85.95 291.572 85.95C288.495 85.95 286.062 83.517 286.062 80.44Z"></path><path d="M248.176 80.44V40.51C248.176 37.433 250.609 35 253.686 35C256.763 35 259.196 37.433 259.196 40.51V80.44C259.196 83.517 256.763 85.95 253.686 85.95C250.609 85.95 248.176 83.517 248.176 80.44Z"></path><path d="M194.048 80.44V40.51C194.048 37.433 196.481 35 199.558 35C202.635 35 205.068 37.433 205.068 40.51V57.3264L225.391 37.1468C226.751 35.7871 228.11 35 230.042 35C233.119 35 235.123 37.3614 235.123 40.0807C235.123 41.7981 234.336 43.0862 233.119 44.2311L219.022 57.398L234.407 76.7189C235.266 77.7923 235.91 78.9372 235.91 80.5831C235.91 83.6601 233.549 85.95 230.328 85.95C228.182 85.95 226.894 84.8766 225.677 83.3023L211.365 64.5539L205.068 70.4217V80.44C205.068 83.517 202.635 85.95 199.558 85.95C196.481 85.95 194.048 83.517 194.048 80.44Z"></path>
        </svg>
      <section>
    </body>
    </html>
  `)

  pdf.addPage(config.pdf)

  pdf.image((await page.screenshot()).buffer, {
    fit: [pdf.page.width, pdf.page.height]
  })

  pdf.on('data', buffers.push.bind(buffers));

  pdf.on('end', () => {

    let pdfBuffer = Buffer.concat(buffers);
    let filename = slug(workspace.name) + '-' + shortid.generate() + '.pdf'

    res.writeHead(200, {
      'Content-Length': Buffer.byteLength(pdfBuffer),
      'Content-Type': 'application/pdf',
      'Content-disposition': 'inline;filename=' + filename
    })
    .end(pdfBuffer);

  });

  pdf.end();

});

module.exports = route;