const color = require('cli-color');
const axios = require('axios');

module.exports = async(workspace, q) => {
  return axios({
    url: 'https://api.stackadapt.com/graphql',
    method: 'post',
    headers: {
      'Authorization': 'Bearer ' + workspace.stackadapt_key
    },
    data: {
      query: q
    }
  })
  .then((response) => {
    if(response.data.errors) {
      let errors = response.data.errors
      for(e in errors) {
        console.log(color.red(errors[e].message))
        console.log(errors[e].locations)
      }
    }
    let key = Object.keys(response.data.data)[0]
    let records = response.data.data[key]
    return records || [];
  })
}