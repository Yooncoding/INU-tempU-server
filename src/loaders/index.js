import expressLoader from "./express";
import sequelizeLodaeer from "./sequelize";

export default async (app) => {
  await sequelizeLodaeer();
  expressLoader(app);
};
