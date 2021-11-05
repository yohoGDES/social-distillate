import axios from 'axios'

export const http = axios.create({
  baseURL: 'https://parseapi.back4app.com/classes',
  headers: {
    'X-Parse-Application-Id': 'NgDawUcAizSiYxhLwSYeg0SRhrLeFrgvFt2Zp3hI',
    'X-Parse-REST-API-Key': 'FGiU5sQGz7lbMLMxHrgqD1TFrbp6y3No2H6Jyef7',
    'Content-Type': 'application/json'
  }
})