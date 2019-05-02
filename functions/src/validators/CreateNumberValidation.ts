import Joi from 'joi';

const validation = {
  options: {
    allowUnknownBody: false,
  },
  body: {
    language: Joi.string().required(),
    number: Joi.number().min(-9999999).max(9999999).precision(4).required(),
  }  
};

export default validation;