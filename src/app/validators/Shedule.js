const Joi = require('joi')

module.exports = {
  body: {
    description: Joi.string().required()
  }
}
