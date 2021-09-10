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
    const newMood = await Mood.create({ temperature, description, userId });
    return newMood;
  },

  getMoodByUser: async (userId, moodId) => {
    const mood = await Mood.findOne({ where: { id: moodId, userId } });
    if (!mood) throw new CustomError("EXIST_NOT_MOOD", 404, "제출된 기분이 없습니다.");
    return mood;
  },
};

async function todayMoodByUser(userId) {
  const Op = Sequelize.Op;
  const TODAY = moment().format("YYYY-MM-DD");
  const TOMORROW = moment().add(1, "d").format("YYYY-MM-DD");
  const mood = await Mood.findOne({ where: { userId, createdAt: { [Op.gt]: TODAY, [Op.lt]: TOMORROW } } });
  if (!mood) throw new CustomError("EXIST_NOT_MOOD", 404, "제출된 기분이 없습니다.");
  return mood;
}

export default MoodService;
