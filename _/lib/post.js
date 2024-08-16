const color = require('cli-color');

module.exports = (url, body) => {
  return fetch(url, {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  .then((response) => {
    if(response.ok) {
      return response.json()
    }
  })
  .then((data) => {
    console.log(color.black(JSON.stringify(data, null, 2)))
    return data
  })
  .catch((err) => {
    console.log(color.yellow(err))
    loading.value = false
  }) 
}