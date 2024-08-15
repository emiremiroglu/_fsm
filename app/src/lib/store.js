const store = (key, val) => {
  if(val) {
    window.localStorage.setItem(key, JSON.stringify(val))
  } else {
    let data = window.localStorage.getItem(key)
    try{
      return JSON.parse(data)
    }
    catch(err) {
      return data
    }
  }
}

export default store