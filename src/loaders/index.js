import expressLoader from "./express";
import databasesLodaer from "./database";

export default async (app) => {
  await databasesLodaer();
  expressLoader(app);
};
