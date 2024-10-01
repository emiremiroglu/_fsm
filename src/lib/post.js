import { inject } from 'vue'
import error from '../errors.json'
const toast = inject('toast');

export default function(url, body) {
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
    return data
  })
  .catch((err) => {
    toast.error(error[err.code])
    loading.value = false
  })
}