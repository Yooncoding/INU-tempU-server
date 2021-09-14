import moment from "moment";
import Sequelize from "sequelize";
import Betting from "../models/Betting";
import CustomError from "../utils/customError";

const BettingService = {
  getBetting: async (userId) => {
    const betting = await todayBettingByUser(userId);
    return betting;
  },

  postBetting: async (userId, temperature) => {
    const betting = await todayBettingByUser(userId);
    if (betting) throw new CustomError("EXIST_TOAY_BETTING", 400, "오늘 이미 제출된 베팅이 있습니다.");
    const newBetting = await Betting.create({ temperature, userId });
    return newBetting;
  },
};

async function todayBettingByUser(userId) {
  const Op = Sequelize.Op;
  const TODAY = moment().format("YYYY-MM-DD");
  const TOMORROW = moment().add(1, "d").format("YYYY-MM-DD");
  const betting = await Betting.findOne({ where: { userId, createdAt: { [Op.gt]: TODAY, [Op.lt]: TOMORROW } } });
  return betting;
}

export default BettingService;
