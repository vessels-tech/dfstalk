import Joi from 'joi';

const validation = {
  options: {
    allowUnknownBody: false,
  },
  body: {
    language: Joi.string().required(),
    // number: Joi.number().min(-9999999).max(9999999).precision(4).required(), //TODO: make builder handle other numbers
    number: Joi.number().min(0).max(9999999).precision(0).required(),
  }  
};

export default validation;