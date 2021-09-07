import { Model, DataTypes } from "sequelize";
import { sequelize } from "./sequelize";

class Mood extends Model {}
Mood.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    temperature: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    sequelize,
    timestamps: true,
    underscored: false,
    modelName: "Mood",
    freezeTableName: true,
    paranoid: false,
    charset: "utf8mb4",
    collate: "utf8mb4_general_ci",
  }
);

export const associate = (db) => {
  db.Mood.belongsTo(db.User, { foreignKey: "userId", targetKey: "id" });
};

export default Mood;
