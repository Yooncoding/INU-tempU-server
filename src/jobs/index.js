import * as schedule from "node-schedule";
import ArchiveService from "../services/archive";
import UserService from "../services/user";
import logger from "../utils/logger";

const jobs = {
  insertMoodAvg: schedule.scheduleJob("00 55 23 * * *", async () => {
    // 23시 55분
    try {
      await ArchiveService.postTodayMoodAvg();
      logger.info("오늘의 기분 평균 저장 완료 => 저장시간:");
    } catch (err) {
      logger.error(err);
    }
  }),

  giveBettingPoint: schedule.scheduleJob("00 05 00 * * *", async () => {
    // 00시 05분
    try {
      await UserService.putPointByBetting();
      logger.info("오늘의 베팅 결과에 따른 점수 지급 => 지급시간:");
    } catch (err) {
      logger.error(err);
    }
  }),
};

export default jobs;
