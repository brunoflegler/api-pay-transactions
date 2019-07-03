const Joi = require('joi')

module.exports = {
  query: {
    page: Joi.number(),
    limit: Joi.number()
  }
}
