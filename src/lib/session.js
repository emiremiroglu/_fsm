export default function(key, value){
  if(key && value) {
    return window.sessionStorage.setItem(key, JSON.stringify(value))
  } else {
    return JSON.parse(window.sessionStorage.getItem(key))
  }
}