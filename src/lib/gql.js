// GQL

import {inject} from 'vue';
import axios from 'axios';

const toast = inject('toast');

export default async(workspace, q) => {
  return axios({
    url: '/stackadapt',
    method: 'post',
    headers: {
      'auth': session('token')
    },
    data: {
      query: q
    }
  })
  .then((response) => {
    if(response.data.errors) {
      let errors = response.data.errors
      for(e in errors) {
        toast.warn(errors[e].message)
        console.log(errors[e].locations)
      }
    }
    let key = Object.keys(response.data.data)[0]
    let records = response.data.data[key]
    return records || [];
  })
}