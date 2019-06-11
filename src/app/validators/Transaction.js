const Joi = require('joi')

module.exports = {
  body: {
    value: Joi.number().required(),
    description: Joi.string().required(),
    methodPayment: Joi.string().required(),
    numberCard: Joi.string().required(),
    nameHolderCard: Joi.string().required(),
    expireAtCard: Joi.string().required(),
    cvvCard: Joi.number().required()
  }
}
