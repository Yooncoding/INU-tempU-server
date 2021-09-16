import moment from "moment";
import Sequelize from "sequelize";
import Archive from "../models/Archive";
import MoodService from "./mood";
import CustomError from "../utils/customError";

const ArchiveService = {
  getArchiveMe: async (userId, year, month) => {
    const archive = await MoodService.getArchiveMe(userId, year, month);
    return archive;
  },

  getArchiveInu: async (year, month) => {
    const Op = Sequelize.Op;
    year = year ? year : moment().format("YYYY");
    month = month ? month : moment().format("MM");
    const MONTHSTART = moment(`${year}-${month}`).startOf("month").format("YYYY-MM-DD");
    const MONTHEND = moment(`${year}-${month}`).endOf("month").format("YYYY-MM-DD");
    const archive = await Archive.findAll({ where: { createdAt: { [Op.gt]: MONTHSTART, [Op.lt]: MONTHEND } } });
    return archive;
  },

  getYesterdayAvg: async () => {
    const Op = Sequelize.Op;
    const TODAY = moment().format("YYYY-MM-DD");
    const YESTERDAY = moment().subtract(1, "d").format("YYYY-MM-DD");
    const archive = await Archive.findOne({ where: { createdAt: { [Op.gt]: YESTERDAY, [Op.lt]: TODAY } } });
    return archive;
  },
};
export default ArchiveService;
