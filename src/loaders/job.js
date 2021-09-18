import jobs from "../jobs";
import logger from "../utils/logger";

export default () => {
  jobs.insertMoodAvg;
  jobs.giveBettingPoint;
  logger.info("JOB LOADED");
};
