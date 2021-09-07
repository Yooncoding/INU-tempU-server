import * as jwt from "jsonwebtoken";
import User from "../models/User";
import config from "../config";
import CustomError from "../utils/customError";

const UserService = {
  login: async (userId) => {
    const user = await User.findByPk(userId);
    if (user) return jwt.sign({ id: user.id }, config.jwtSecret);

    const nickname = generateName();
    const newUser = await User.create({ userId, nickname });
    return jwt.sign({ id: newUser.id }, config.jwtSecret);
  },

  getUser: async (userId) => {
    const user = await User.findByPk(userId);
    if (!user) throw new CustomError("USER_NOT_EXIST", 404, "탈퇴한 회원입니다.");

    const users = await User.findAll({ order: [["point", "DESC"]] });
    const rank = users.findIndex((user, idx) => {
      if (user.id == userId) return idx;
    });

    let data = {};
    data.id = user.id;
    data.image = user.image;
    data.point = user.point;
    data.rank = rank + 1;

    return data;
  },

  findById: async (userId) => {
    return await User.findByPk(userId);
  },
};

function generateName() {
  return Math.random().toString(36).substr(2, 8);
}
export default UserService;
