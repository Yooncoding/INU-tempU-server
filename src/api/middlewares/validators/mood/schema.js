import DateExtension from "@joi/date";
import * as JoiImport from "joi";
const joi = JoiImport.extend(DateExtension);

const schema = {
  postMood: joi.object({
    temperature: joi.number().integer().min(0).max(100).required(),
    description: joi.string(),
  }),

  getArchive: joi.object({
    y: joi.date().format("YYYY"),
    m: joi.date().format("MM"),
  }),
};

export default schema;
