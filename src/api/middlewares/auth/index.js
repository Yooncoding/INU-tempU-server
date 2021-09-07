import request from "request";
import config from "../../../config";
import CustomError from "../../../utils/customError";

const auth = {
  isStudent: (req, res, next) => {
    const { id, password } = req.body;
    const data = `log=${id}&pwd=${password}`;
    const options = {
      ...config.login,
      form: data,
    };
    request(options, function (error, response) {
      if (error) next(error);
      if (response) {
        if (!response.body) {
          const error = CustomError("NOT_STUDENT", 401, "학번과 비밀번호를 다시 확인해주세요.");
          next(error);
        }
      }

      next();
    });
  },
};

export default auth;
