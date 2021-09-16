import schema from "./schema";
import CustomError from "../../../../utils/customError";

const BettingValidator = {
  postBetting: (req, res, next) => {
    const value = schema.postBetting.validate(req.body);
    if (value.error) {
      const error = new CustomError("VALID_ERROR", 400, value.error.details[0].message);
      next(error);
    }
    next();
  },
};

export default BettingValidator;
