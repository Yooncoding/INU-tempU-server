import schema from "./schema";
import CustomError from "../../../../utils/customError";

const UserValidator = {
  login: (req, res, next) => {
    const value = schema.login.validate(req.body);
    if (value.error) {
      const error = new CustomError("VALID_ERROR", 400, value.error.details[0].message);
      next(error);
    }
    next();
  },

  postEdit: (req, res, next) => {
    const value = schema.postEdit.validate(req.body);
    if (value.error) {
      const error = new CustomError("VALID_ERROR", 400, value.error.details[0].message);
      next(error);
    }
    next();
  },
};

export default UserValidator;
