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

  postEdit: async (userId, nickname) => {
    const existNickname = await User.findOne({ where: { nickname } });
    const mutableNickname = existNickname && existNickname.id !== userId;
    if (mutableNickname) throw new CustomError("EXIST_NICKNAME", 409, "이미 존재하는 닉네임입니다.");

    return await User.update({ nickname }, { where: { id: userId } });
  },

  getUser: async (userId) => {
    const user = await User.findByPk(userId);
    if (!user) throw new CustomError("USER_NOT_EXIST", 404, "탈퇴한 회원입니다.");

    const users = await User.findAll({ order: [["point", "DESC"]] });
    const rank = getMyRank(users, userId);

    let data = {};
    data.id = user.id;
    data.image = user.image;
    data.point = user.point;
    data.rank = rank;

    return data;
  },

  getUsersRank: async (userId) => {
    const users = await User.findAll({ order: [["point", "DESC"]] });
    const rank = getMyRank(users, userId);
    const usersRank = users.slice(0, 5);

    let data = {};
    data.usersRank = usersRank;
    data.rank = rank;

    return data;
  },

  findById: async (userId) => {
    return await User.findByPk(userId);
  },
};

function generateName() {
  return Math.random().toString(36).substr(2, 8);
}

function getMyRank(users, userId) {
  let rank = 0;
  users.some((user) => {
    rank++;
    if (user.id == userId) return true;
  });
  return rank;
}

export default UserService;
