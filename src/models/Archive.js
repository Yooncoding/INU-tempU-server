import { Model, DataTypes } from "sequelize";
import { sequelize } from "./sequelize";

class Archive extends Model {}
Archive.init(
  {
    temperatureAvg: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    underscored: false,
    modelName: "Archive",
    freezeTableName: true,
    paranoid: false,
    charset: "utf8mb4",
    collate: "utf8mb4_general_ci",
  }
);

export default Archive;
