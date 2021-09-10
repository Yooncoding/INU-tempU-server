import joi from "joi";

const schema = {
  postMood: joi.object({
    temperature: joi.number().integer().min(0).max(100).required(),
    description: joi.string(),
  }),
};

export default schema;
