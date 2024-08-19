module.exports = (collection, id, req) => {
  console.log(collection, req?.headers?.auth || null)
  let url = `https://pocketbase.rmtx.dev/api/collections/${collection}/records`

  if(id) {
    url = `https://pocketbase.rmtx.dev/api/collections/${collection}/records/${id}`
  }
  
  let request = fetch(url, {
    headers: {
      'Authorization': req?.headers?.auth || null
    }
  })
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