const fs = require('fs');
const _ = require('underscore');
const color = require('cli-color');
const config = require('./config.json')

const page_limit = 30;

const keys = [
  '126710d8d98e0873cdb79b0c4b444300',
  '37affd54837dcdd6d560c83efc43edcd'
]

let advertiser_counter = 0
let line_items_counter = 0
let campaigns_counter = 0

;(async () => {
  for(i in keys) {
    let key = keys[i]

    let advertisers_request = await(await fetch(config.stackadapt.url +'/advertisers', { headers: { 'X-Authorization': key } }).catch(err => console.log(err))).json();
    let line_items_request = await(await fetch(config.stackadapt.url + '/line_items', { headers: { 'X-Authorization': key } }).catch(err => console.log(err))).json();
    let campaigns_request = await(await fetch(config.stackadapt.url + '/campaigns', { headers: { 'X-Authorization': key } }).catch(err => console.log(err))).json();

    let advertisers_pages = Math.ceil(advertisers_request.total_advertisers / page_limit)
    let line_items_pages = Math.ceil(line_items_request.total_line_items / page_limit)
    let campaigns_pages = Math.ceil(campaigns_request.total_campaigns / page_limit)

    let advertisers_urls = []
    let line_items_urls = []
    let campaigns_urls = []

    for(let a = 1; a <= advertisers_pages; a++) {
      advertisers_urls.push(config.stackadapt.url +'/advertisers' + '?page=' + a)
    }

    for(let l = 1; l <= line_items_pages; l++) {
      line_items_urls.push(config.stackadapt.url +'/line_items' + '?page=' + l)
    }

    for(let c = 1; c <= campaigns_pages; c++) {
      campaigns_urls.push(config.stackadapt.url +'/campaigns' + '?page=' + c)
    }

    // FETCH ADVERTISER
    let advertisers_fetch = Promise.all(advertisers_urls.map(url =>
      fetch(url, { headers: { 'X-Authorization': key } }).then(resp => resp.json()).catch(err => console.log(err))
    ))
    .then(pages => {
      let arr = []
      for(p in pages) {
        let items = pages[p].data
        for(i in items) {
          arr.push(items[i])
          fs.writeFileSync('./db/advertisers/' + items[i].id + '.json', JSON.stringify(items[i], null, 2))
        }
      }
      return arr
    })

    .catch(err => {
      console.log(err)
    })

    // FETCH LINE ITEMS
    let line_items_fetch = Promise.all(line_items_urls.map(url =>
      fetch(url, { headers: { 'X-Authorization': key } }).then(resp => resp.json()).catch(err => console.log(err))
    ))
    .then(pages => {
      let arr = []
      for(p in pages) {
        let items = pages[p].data
        for(i in items) {
          arr.push(items[i])
          fs.writeFileSync('./db/line_items/' + items[i].id + '.json', JSON.stringify(items[i], null, 2))
        }
      }
      return arr
    })
    .catch(err => {
      console.log(err)
    })

    // FETCH CAMPAIGNS
    let campaigns_fetch = Promise.all(campaigns_urls.map(url =>
      fetch(url, { headers: { 'X-Authorization': key } }).then(resp => resp.json()).catch(err => console.log(err))
    ))
    .then(pages => {
      let arr = []
      for(p in pages) {
        let items = pages[p].data
        for(i in items) {
          arr.push(items[i])
          let campaign = {
            id: items[i].id,
            name: items[i].name,
            ads: items[i].all_native_ads
          }
          fs.writeFileSync('./db/campaigns/' + campaign.id + '.json', JSON.stringify(campaign, null, 2))
        }
      }
      return arr
    })
    .catch(err => {
      console.log(err)
    })

    Promise.all([
      advertisers_fetch,
      line_items_fetch,
      campaigns_fetch
    ]).then(data => {

      let advertisers = data[0]
      let line_items = data[1]
      let campaigns = data[2]

      for(a in advertisers) {
        console.log(advertiser_counter++, advertisers[a].name)
      }

      for(c in campaigns) {
        let advertiser = _.findWhere(advertisers, { id: campaigns[c].advertiser_id })

        if(campaigns[c].status.code === 'active') {

          // console.log( '[' + campaigns[c].channel + ']', campaigns[c].name )

          let ads = campaigns[c].all_native_ads

          // for(a in ads) {
          //   console.log(color.black( '[' + ads[a].channel + ']', ads[a].name))
          // }

        }
      }

    })
  }
})()
.catch(err => {
  console.log(err)
});