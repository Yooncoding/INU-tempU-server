import { Model, DataTypes } from "sequelize";
import { sequelize } from "./sequelize";

class Betting extends Model {}
Betting.init(
  {
    temperature: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    underscored: false,
    modelName: "Betting",
    freezeTableName: true,
    paranoid: false,
    charset: "utf8mb4",
    collate: "utf8mb4_general_ci",
  }
);

export const associate = (db) => {
  db.Betting.belongsTo(db.User, { foreignKey: "userId", targetKey: "id" });
};

export default Betting;
