import schema from "./schema";
import CustomError from "../../../../utils/customError";

const ArchiveValidator = {
  getArchive: (req, res, next) => {
    const value = schema.getArchive.validate(req.query);
    if (value.error) {
      const error = new CustomError("VALID_ERROR", 400, value.error.details[0].message);
      next(error);
    }
    next();
  },
};

export default ArchiveValidator;
