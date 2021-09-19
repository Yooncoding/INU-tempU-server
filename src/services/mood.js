import moment from "moment";
import Sequelize from "sequelize";
import Mood from "../models/Mood";
import CustomError from "../utils/customError";

const MoodService = {
  getMoodToday: async (userId) => {
    const mood = await todayMoodByUser(userId);
    return mood;
  },

  postMood: async (userId, temperature, description) => {
    const mood = await todayMoodByUser(userId);
    if (mood) throw new CustomError("EXIST_TOAY_MOOD", 400, "오늘 이미 제출된 기분이 있습니다.");
    const impossiblePostTime = !postMoodTimeCheck();
    if (impossiblePostTime) throw new CustomError("NO_TIME_TO_POST", 402, "기분 제출 가능 시간은 08시~23시 입니다.");
    const newMood = await Mood.create({ temperature, description, userId });
    return newMood;
  },

  getMoodByUser: async (userId, moodId) => {
    const mood = await Mood.findOne({ where: { id: moodId, userId } });
    return mood;
  },

  putMood: async (userId, moodId, temperature, description) => {
    const TODAY = moment().format("YYYY-MM-DD");
    const mood = await Mood.findOne({ where: { id: moodId, userId } });
    const CREATEAT = moment(mood.createdAt).format("YYYY-MM-DD");
    if (!mood) throw new CustomError("EXIST_NOT_MOOD", 404, "제출된 기분이 없습니다.");
    if (CREATEAT >= TODAY) throw new CustomError("TODAY_MOOD_NOT_EDITABLE", 400, "오늘이 아닌 이전에 제출된 기분만 수정이 가능합니다.");
    return await Mood.update({ temperature, description }, { where: { id: moodId } });
  },

  getArchiveMe: async (userId, year, month) => {
    const Op = Sequelize.Op;
    year = year ? year : moment().format("YYYY");
    month = month ? month : moment().format("MM");
    const MONTHSTART = moment(`${year}-${month}`).startOf("month").format("YYYY-MM-DD");
    const MONTHEND = moment(`${year}-${month}`).endOf("month").format("YYYY-MM-DD");
    const mood = await Mood.findAll({ where: { userId, createdAt: { [Op.gt]: MONTHSTART, [Op.lt]: MONTHEND } } });
    return mood;
  },

  getTodayMoodAvg: async () => {
    const Op = Sequelize.Op;
    const TODAY = moment().format("YYYY-MM-DD");
    const TOMORROW = moment().add(1, "d").format("YYYY-MM-DD");
    const moodCount = await Mood.count({ where: { createdAt: { [Op.gt]: TODAY, [Op.lt]: TOMORROW } } });
    const moodSum = await Mood.sum("temperature", { where: { createdAt: { [Op.gt]: TODAY, [Op.lt]: TOMORROW } } });

    let data = {};
    data.moodAvg = Math.round(moodSum / moodCount);
    data.moodCount = moodCount;

    return data;
  },
};

async function todayMoodByUser(userId) {
  const Op = Sequelize.Op;
  const TODAY = moment().format("YYYY-MM-DD");
  const TOMORROW = moment().add(1, "d").format("YYYY-MM-DD");
  const mood = await Mood.findOne({ where: { userId, createdAt: { [Op.gt]: TODAY, [Op.lt]: TOMORROW } } });
  return mood;
}

function postMoodTimeCheck() {
  const NOW = moment().format("YYYY-MM-DD HH:mm:ss");
  const TODAY = moment().format("YYYY-MM-DD");
  const result = moment(NOW).isBetween(`${TODAY} 08:00:00`, `${TODAY} 23:00:00`);
  return result;
}

export default MoodService;
