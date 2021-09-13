import User, { associate as associateUser } from "./User";
import Mood, { associate as associateMood } from "./Mood";
import Betting, { associate as associateBetting } from "./Betting";
import Archive from "./Archive";
export * from "./sequelize";

export const db = {
  User,
  Mood,
  Betting,
  Archive,
};

associateUser(db);
associateMood(db);
associateBetting(db);
