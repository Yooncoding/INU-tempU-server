import User, { associate as associateUser } from "./User";
import Mood, { associate as associateMood } from "./Mood";
import Betting, { associate as associateBetting } from "./Betting";
export * from "./sequelize";

export const db = {
  User,
  Mood,
  Betting,
};

associateUser(db);
associateMood(db);
associateBetting(db);
