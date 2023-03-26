const Joi = require("joi");


const userPostSchema = Joi.object({
    firstName: Joi.string()
        .alphanum()
        .required(),
    lastName: Joi.string()
        .alphanum()
        .required(),
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(20)
        .required(),
    password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,20}$"))
        .required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
    isAdmin: Joi.boolean()
        .default(false)
});


const userPatchSchema = Joi.object({
    firstName: Joi.string()
        .alphanum(),
    lastName: Joi.string()
        .alphanum(),
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(20),
    password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,20}$")),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
    isAdmin: Joi.boolean()
        .default(false)
});


const absencePostSchema = Joi.object({
    userId: Joi.int()
        .required(),
    absenceType: Joi.string()
        .alphanum()
        .required(),
    startDate: Joi.date()
        .required(),
    endDate: Joi.date()
        .required(),
    isApproved: Joi.boolean()
        .default(false),
});


const absencePatchSchema = Joi.object({
    userId: Joi.int()
        .required(),
    absenceType: Joi.string()
        .alphanum(),
    startDate: Joi.date(),
    endDate: Joi.date(),
    isApproved: Joi.boolean()
});

module.exports = {
    userPostSchema,
    userPatchSchema,  
    absencePostSchema,
    absencePatchSchema  
}
