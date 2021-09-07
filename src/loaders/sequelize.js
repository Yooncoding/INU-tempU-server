import { sequelize } from "../models";
import logger from "../utils/logger";

export default async () => {
  await sequelize
    .sync({ force: false })
    .then(() => {
      logger.info("DATABASE LOADED");
    })
    .catch((err) => {
      logger.error(err);
    });

  return sequelize;
};
