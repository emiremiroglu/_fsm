import session from '../lib/session';

export default function(url){
  return fetch(url, {
    headers: {
      auth: session('token') || null
    }
  })
  .then(response => response.json())
  .then(data => {
    return data
  })
}