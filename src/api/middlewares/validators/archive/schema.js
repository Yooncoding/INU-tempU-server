import DateExtension from "@joi/date";
import * as JoiImport from "joi";
const joi = JoiImport.extend(DateExtension);

const schema = {
  getArchive: joi.object({
    y: joi.date().format("YYYY"),
    m: joi.date().format("MM"),
  }),
};

export default schema;
