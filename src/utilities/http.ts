import axios from 'axios'

import { getSessionToken } from './localStorage'

const session = getSessionToken() as string
const apiUrl = 'https://parseapi.back4app.com'

export const http = axios.create({
  baseURL: `${apiUrl}/classes`,
  headers: {
    'X-Parse-Application-Id': 'NgDawUcAizSiYxhLwSYeg0SRhrLeFrgvFt2Zp3hI',
    'X-Parse-REST-API-Key': 'FGiU5sQGz7lbMLMxHrgqD1TFrbp6y3No2H6Jyef7',
    'Content-Type': 'application/json'
  }
})

http.interceptors.request.use(function (config) {
  if (session && config.headers) {
    config.headers['X-Parse-Session-Token'] = session
  }

  return config
});