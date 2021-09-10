import moment from "moment";
import Sequelize from "sequelize";
import Mood from "../models/Mood";

const MoodService = {
  getMoodByUser: async (userId) => {
    const Op = Sequelize.Op;
    const TODAY = moment().format("YYYY-MM-DD");
    const TOMORROW = moment().add(1, "d").format("YYYY-MM-DD");
    const mood = await Mood.findOne({
      where: {
        userId,
        createdAt: { [Op.gt]: TODAY, [Op.lt]: TOMORROW },
      },
    });
    return mood;
  },
};

export default MoodService;
