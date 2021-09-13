import DateExtension from "@joi/date";
import * as JoiImport from "joi";
const joi = JoiImport.extend(DateExtension);

const schema = {
  postMood: joi.object({
    temperature: joi.number().integer().min(0).max(100).required(),
    description: joi.string(),
  }),
};

export default schema;
