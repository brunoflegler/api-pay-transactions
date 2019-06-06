const axios = require('axios')

const configAxios = require('../config/axios')
const https = require('https')

const infopen = axios.create({
  baseURL: configAxios.baseUrlSusepe,
  httpsAgent: new https.Agent({ rejectUnauthorized: false }),
  withCredentials: false
})

const report = axios.create({
  baseURL: configAxios.baseUrlSusepeRel
})

const api = axios.create({})

module.exports = { infopen, api, report }
