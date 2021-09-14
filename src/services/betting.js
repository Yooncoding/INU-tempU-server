import moment from "moment";
import Sequelize from "sequelize";
import Betting from "../models/Betting";

const BettingService = {
  getBetting: async (userId) => {
    const betting = await todayBettingByUser(userId);
    return betting;
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
