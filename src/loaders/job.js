import jobs from "../jobs";
import logger from "../utils/logger";

export default () => {
  jobs.insertMoodAvg;
  logger.info("JOB LOADED");
};
