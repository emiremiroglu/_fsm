module.exports = (collection, id) => {
  let url = `https://pocketbase.rmtx.dev/api/collections/${collection}/records`

  if(id) {
    url = `https://pocketbase.rmtx.dev/api/collections/${collection}/records/${id}`
  }
  
  let request = fetch(url)
  .then(response => response.json())
  .then(response => {
    if(id) {
      return response
    } else {
      if(response.items.length) {
        return response.items
      } else {
        return []
      }
    }

  })
  .catch(err => {
    console.log(err)
  })
  return request
}