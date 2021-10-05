import { verify } from "jsonwebtoken";
import request from "request";
import config from "../../../config";
import UserService from "../../../services/user";
import CustomError from "../../../utils/customError";

const auth = {
  isStudent: (req, res, next) => {
    const { id, password } = req.body;
    const data = `log=${id}&pwd=${password}`;
    const options = {
      ...config.login,
      body: data,
    };
    request(options, function (error, response) {
      if (error) next(error);
      if (!response) {
        const error = new CustomError("NOT_STUDENT", 401, "학번과 비밀번호를 다시 확인해주세요.");
        return next(error);
      }
      if (response.headers["set-cookie"][2].match(/wrong_password/)) {
        const error = new CustomError("NOT_STUDENT", 401, "학번과 비밀번호를 다시 확인해주세요.");
        return next(error);
      }
      if (response.headers["set-cookie"][4].match(/logged_in/)) {
        return next();
      }
    });
  },

  isLogin: async (req, res, next) => {
    try {
      const { authorization } = req.headers;
      if (!authorization) throw new CustomError("UNAUTHENTICATED", 401, "로그인이 필요합니다.");
      const token = authorization.split(" ");
      const user = await tokenVerify(token);
      req.user = user;
      next();
    } catch (err) {
      next(err);
    }
  },
};

async function tokenVerify(token) {
  if (token[0] !== "Bearer" && token[0] !== "Token") throw new CustomError("TOKEN_IS_WRONG", 403, "잘못된 토큰입니다.");
  const { id } = verify(token[1], config.jwtSecret);
  const user = await UserService.findById(id);
  if (!user) throw new CustomError("USER_NOT_EXIST", 404, "탈퇴한 회원입니다.");
  return user;
}

export default auth;
