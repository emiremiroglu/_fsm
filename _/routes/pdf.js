// PDF
const config = require('../config.json');

const express = require('express');
const puppeteer = require('puppeteer');
const PDFDocument = require('pdfkit');
const shortid = require('shortid');
const slug = require('slug');
const fs = require('fs');

const route = express.Router();

route.get('/:wid', async(req, res) => {

  let wid = req.params.wid
  let workspace = JSON.parse(fs.readFileSync('./db/' + wid + '.json', 'utf-8'))

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
        body { font-family: '${workspace.css.font}', sans-serif; color: ${workspace.css.color.foreground}; }
      </style>
    </head>
  `

  await page.setContent(`
    <!DOCTYPE html>
    <html lang="en">
    ${head}
    <body class="w-screen h-screen bg-[${workspace.css.color.background}] overflow-y-hidden">
      <section class="flex h-screen w-screen flex-col gap-10 items-center justify-center text-center">
        <h1 class="text-9xl tracking-tight font-bold text-[${workspace.css.color.foreground}]">${workspace.name}</h1>
      <section>
    </body>
    </html>
  `)

  // pdf.addPage(config.pdf)

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