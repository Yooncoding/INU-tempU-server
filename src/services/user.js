import * as jwt from "jsonwebtoken";
import Sequelize from "sequelize";
import path from "path";
import fs from "fs";
import User from "../models/User";
import BettingService from "./betting";
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

  putImage: async (userId, image) => {
    const user = await User.findByPk(userId);
    const uploadDir = path.join(__dirname, "../../uploads");
    const DEFAULT_PROFILE_IMAGE = "profile-default.png";
    if (user.image !== DEFAULT_PROFILE_IMAGE) {
      fs.unlinkSync(uploadDir + "/" + user.image);
    }
    return await User.update({ image }, { where: { id: userId } });
  },

  deleteImage: async (userId) => {
    const user = await User.findByPk(userId);
    const DEFAULT_PROFILE_IMAGE = "profile-default.png";
    if (user.image === DEFAULT_PROFILE_IMAGE) throw new CustomError("ALREADY_PROFILE_DEFAULT", 400, "이미 기본 이미지입니다.");

    const uploadDir = path.join(__dirname, "../../uploads");
    fs.unlinkSync(uploadDir + "/" + user.image);
    return await User.update({ image: DEFAULT_PROFILE_IMAGE }, { where: { id: userId } });
  },

  getUser: async (userId) => {
    const user = await User.findByPk(userId);
    if (!user) throw new CustomError("USER_NOT_EXIST", 404, "탈퇴한 회원입니다.");

    const users = await User.findAll({ order: [["point", "DESC"]] });
    const rank = getMyRank(users, userId);

    let data = {};
    data.id = user.id;
    data.nickname = user.nickname;
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

  putPointByBetting: async () => {
    const data = await BettingService.getBettingResultUser();

    await givePointToBest(data);
    await givePointToBetter(data);
    await givePointToGood(data);

    return true;
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

async function givePointToBest(data) {
  const Op = Sequelize.Op;
  const bestUsers = await User.findAll({ where: { id: { [Op.in]: data.bestUser } } });

  bestUsers.forEach(async (user) => {
    await User.update({ point: user.point + 500 }, { where: { id: user.id } });
  });
  return true;
}

async function givePointToBetter(data) {
  const Op = Sequelize.Op;
  const betterUsers = await User.findAll({ where: { id: { [Op.in]: data.betterUser } } });

  betterUsers.forEach(async (user) => {
    await User.update({ point: user.point + 300 }, { where: { id: user.id } });
  });
  return true;
}

async function givePointToGood(data) {
  const Op = Sequelize.Op;
  const goodUsers = await User.findAll({ where: { id: { [Op.in]: data.goodUser } } });
  goodUsers.forEach(async (user) => {
    await User.update({ point: user.point + 100 }, { where: { id: user.id } });
  });
  return true;
}

export default UserService;
