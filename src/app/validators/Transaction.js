const Joi = require('joi')

module.exports = {
  body: {
    infopen: Joi.number().required(),
    name: Joi.string().required(),
    scheduleAt: Joi.date().required(),
    reasonId: Joi.number().required(),
    regionId: Joi.number().required(),
    prisonId: Joi.number().required(),
    prisonerStateId: Joi.number().required(),
    description: Joi.string().required()
  }
}
