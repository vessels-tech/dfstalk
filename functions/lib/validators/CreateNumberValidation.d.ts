import Joi from 'joi';
declare const validation: {
    options: {
        allowUnknownBody: boolean;
    };
    body: {
        language: Joi.StringSchema;
        number: Joi.NumberSchema;
        format: Joi.StringSchema;
    };
};
export default validation;
