import ArchiveService from "../services/archive";
import * as schedule from "node-schedule";
import logger from "../utils/logger";

const jobs = {
  insertMoodAvg: schedule.scheduleJob("00 55 23 * * *", async () => {
    // 23시 55분
    await ArchiveService.postTodayMoodAvg();
    logger.info("오늘의 기분 평균 저장 완료 => 저장시간:");
  }),
};

export default jobs;
