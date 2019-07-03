const Joi = require('joi')

module.exports = {
  params: {
    status: Joi.string()
      .valid(['paid', 'waiting_funds'])
      .required()
  }
}
