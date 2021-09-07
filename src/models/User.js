import { Model, DataTypes } from "sequelize";
import { sequelize } from "./sequelize";

class User extends Model {}
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    nickname: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    point: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    image: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "profile-default.png",
    },
    role: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    timestamps: false,
    underscored: false,
    modelName: "User",
    freezeTableName: true,
    paranoid: false,
    charset: "utf8mb4",
    collate: "utf8mb4_general_ci",
  }
);

export const associate = (db) => {
  db.User.hasMany(db.Mood, { foreignKey: "userId", sourceKey: "id" });
  db.User.hasMany(db.Betting, { foreignKey: "userId", sourceKey: "id" });
};

export default User;
