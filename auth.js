import request from 'request';

const headers = {
  accept: 'application/json',
  'content-type': 'application/json'
}
const method = 'POST'
const url = 'https://api.openpath.com/auth/login'

export default (email, password) => {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ email, password })
    const options = { method, url, headers, body };

    request(options, (error, response, body) => {
      if (error) {
        reject(new Error(error))
      }

      resolve(body)
    })
  })
}
