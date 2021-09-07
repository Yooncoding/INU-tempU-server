import * as jwt from "jsonwebtoken";
import User from "../models/User";
import config from "../config";

const UserService = {
  login: async (id) => {
    const user = await User.findByPk(id);
    if (user) return jwt.sign({ id: user.id }, config.jwtSecret);

    const nickname = generateName();
    const newUser = await User.create({ id, nickname });
    return jwt.sign({ id: newUser.id }, config.jwtSecret);
  },

  findById: async (id) => {
    return await User.findByPk(id);
  },
};

function generateName() {
  return Math.random().toString(36).substr(2, 8);
}
export default UserService;
