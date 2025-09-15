import Joi from "joi";

 const adminSchema = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export default adminSchema;