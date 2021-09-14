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
    const impossiblePostTime = !postBettingTimeCheck();
    if (impossiblePostTime) throw new CustomError("NO_TIME_TO_POST", 402, "베팅 제출 가능 시간은 08시~23시 입니다.");
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

function postBettingTimeCheck() {
  const NOW = moment().format("YYYY-MM-DD HH:mm:ss");
  const TODAY = moment().format("YYYY-MM-DD");
  const result = moment(NOW).isBetween(`${TODAY} 08:00:00`, `${TODAY} 16:00:00`);
  return result;
}

export default BettingService;
