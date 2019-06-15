const envPath = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : `.env`

require('dotenv').config({
  path: envPath.trim()
})

const express = require('express')
const cors = require('cors')
const validate = require('express-validation')
const Youch = require('youch')
const path = require('path')

class App {
  constructor () {
    this.express = express()
    this.middlewares()
    this.routes()
    this.exception()
    this.views()
  }

  views () {
    this.express.use(express.static(path.resolve(__dirname, '..', 'public')))
  }

  middlewares () {
    this.express.use(cors())
    this.express.use(express.json())
  }

  routes () {
    this.express.use(require('./router'))
  }

  exception () {
    this.express.use(async (err, req, res, next) => {
      if (err instanceof validate.ValidationError) {
        return res.status(err.status || 500).json(err)
      }

      if (process.env.NODE_ENV !== 'production') {
        const youch = new Youch(err)
        return res.status(err.status || 500).json(await youch.toJSON())
      }

      return res
        .status(err.status || 500)
        .json({ error: 'Internal server error' })
    })
  }
}

module.exports = new App().express
