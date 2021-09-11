import schema from "./schema";
import CustomError from "../../../../utils/customError";

const MoodValidator = {
  postMood: (req, res, next) => {
    const value = schema.postMood.validate(req.body);
    if (value.error) {
      const error = new CustomError("VALID_ERROR", 400, value.error.details[0].message);
      next(error);
    }
    next();
  },

  getArchive: (req, res, next) => {
    const value = schema.getArchive.validate(req.query);
    if (value.error) {
      const error = new CustomError("VALID_ERROR", 400, value.error.details[0].message);
      next(error);
    }
    next();
  },
};

export default MoodValidator;
