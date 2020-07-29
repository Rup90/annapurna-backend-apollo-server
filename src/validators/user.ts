const Joi = require('@hapi/joi');

 

const firstName = Joi.string().max(255).required().empty().messages({

    "string.base": `"firstName" should be a type of 'text'`,

    "string.empty": `"firstName" cannot be an empty field`,

    "string.max": `"firstName" should have a maximum length of {#limit}`,

    "any.required": `"firstName" is a required field`

});

const lastName = Joi.string().max(255).required().empty().messages({

    "string.base": `"lastName" should be a type of 'text'`,

    "string.empty": `"lastName" cannot be an empty field`,

    "string.max": `"lastName" should have a maximum length of {#limit}`,

    "any.required": `"lastName" is a required field`

});

const email = Joi.string().email().required().empty().messages({

    "string.base": `"email" should be a type of 'text'`,

    "string.empty": `"email" cannot be an empty field`,

    "string.email": `"email" must be valid`,

    "any.required": `"email" is a required field`

});

const password = Joi.string().max(30).min(8).required().empty().messages({

    "string.base": `"password" should be a type of 'text'`,

    "string.empty": `"password" cannot be an empty field`,

    "string.min": `"password" should have a minimum length of {#limit}`,

    "string.max": `"password" should have a maximum length of {#limit}`,

    "any.required": `"password" is a required field`

});

const role = Joi.string().max(255).required().empty().messages({

    "string.base": `"role" should be a type of 'text'`,

    "string.empty": `"role" cannot be an empty field`,

    "any.required": `"role" is a required field`

});

 

export const loginValidate = Joi.object({

    email,

    password

})

 

export const registerValidate = Joi.object({

    firstName,

    lastName,

    email,

    password,

    role

})

 