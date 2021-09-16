import moment from "moment";
import Sequelize from "sequelize";
import Betting from "../models/Betting";
import CustomError from "../utils/customError";
import ArchiveService from "./archive";

const BettingService = {
  getBetting: async (userId) => {
    const betting = await todayBettingByUser(userId);
    return betting;
  },

  postBetting: async (userId, temperature) => {
    const betting = await todayBettingByUser(userId);
    if (betting) throw new CustomError("EXIST_TOAY_BETTING", 400, "오늘 이미 제출된 베팅이 있습니다.");
    const impossiblePostTime = !postBettingTimeCheck();
    if (impossiblePostTime) throw new CustomError("NO_TIME_TO_POST", 402, "베팅 제출 가능 시간은 08시~16시 입니다.");
    const newBetting = await Betting.create({ temperature, userId });
    return newBetting;
  },

  putBetting: async (userId, temperature) => {
    const betting = await todayBettingByUser(userId);
    if (!betting) throw new CustomError("EXIST_NOT_BETTING", 404, "제출된 베팅이 없습니다.");
    const impossiblePostTime = !postBettingTimeCheck();
    if (impossiblePostTime) throw new CustomError("NO_TIME_TO_POST", 402, "베팅 제출 가능 시간은 08시~16시 입니다.");
    return await Betting.update({ temperature }, { where: { id: betting.id } });
  },

  getBettingResult: async (userId) => {
    const betting = await yesterdayBettingByUser(userId);
    if (!betting) throw new CustomError("EXIST_NOT_BETTING", 404, "어제 제출된 베팅이 없습니다.");
    const yesterdayAvg = await ArchiveService.getYesterdayAvg();
    if (!yesterdayAvg) throw new CustomError("EXIST_NOT_MOOD", 404, "어제 제출된 기분이 없습니다.");
    const result = compareBettingAndAvg(betting.temperature, yesterdayAvg.temperatureAvg);

    let data = {};
    data.bettingTemp = betting.temperature;
    data.yesterdayTempAvg = yesterdayAvg.temperatureAvg;
    data.result = result;

    return data;
  },
};

async function todayBettingByUser(userId) {
  const Op = Sequelize.Op;
  const TODAY = moment().format("YYYY-MM-DD");
  const TOMORROW = moment().add(1, "d").format("YYYY-MM-DD");
  const betting = await Betting.findOne({ where: { userId, createdAt: { [Op.gt]: TODAY, [Op.lt]: TOMORROW } } });
  return betting;
}

async function yesterdayBettingByUser(userId) {
  const Op = Sequelize.Op;
  const TODAY = moment().format("YYYY-MM-DD");
  const YESTERDAY = moment().subtract(1, "d").format("YYYY-MM-DD");
  const betting = await Betting.findOne({ where: { userId, createdAt: { [Op.gt]: YESTERDAY, [Op.lt]: TODAY } } });
  return betting;
}

function postBettingTimeCheck() {
  const NOW = moment().format("YYYY-MM-DD HH:mm:ss");
  const TODAY = moment().format("YYYY-MM-DD");
  const result = moment(NOW).isBetween(`${TODAY} 08:00:00`, `${TODAY} 16:00:00`);
  return result;
}

function compareBettingAndAvg(betting, avg) {
  let result = 0;
  if (avg === betting) result = 500;
  if (avg === betting + 1 || avg === betting - 1) result = 300;
  if (avg === betting + 2 || avg === betting - 2) result = 100;
  return result;
}

export default BettingService;
