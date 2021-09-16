import joi from "joi";

const schema = {
  postBetting: joi.object({
    temperature: joi.number().integer().min(0).max(100).required(),
  }),
};

export default schema;
