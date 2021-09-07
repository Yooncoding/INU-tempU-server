// import db from "mysql2/promise";
// import config from "../config";
// import logger from "../utils/logger";

// export default async () => {
//   const conn = await db.createConnection(config.db);

//   /**
//    * @description Create User Table
//    */
//   await conn.execute(
//     `
//     CREATE TABLE IF NOT EXISTS User (
//       id int(11) NOT NULL,
//       nickname varchar(10) NOT NULL,
//       point int(11) NOT NULL DEFAULT 0,
//       image varchar(255) NOT NULL DEFAULT 'profile-default.png',
//       role tinyint(1) NOT NULL DEFAULT 0,
//       PRIMARY KEY (id),
//       UNIQUE KEY (nickname)
//     ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
//     `
//   );

//   /**
//    * @description Create Mood Table
//    */
//   await conn.execute(
//     `
//     CREATE TABLE IF NOT EXISTS Mood (
//       id int(11) NOT NULL,
//       temperature int(11) NOT NULL,
//       description varchar(255),
//       createdAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
//       updatedAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
//       userId int(11) DEFAULT NULL,
//       PRIMARY KEY (id),
//       KEY userId (userId),
//       CONSTRAINT mood_idfk_1 FOREIGN KEY (userId) REFERENCES User (id) ON DELETE CASCADE
//     ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
//     `
//   );

//   /**
//    * @description Create Betting Table
//    */
//   await conn.execute(
//     `
//     CREATE TABLE IF NOT EXISTS Betting (
//       id int(11) NOT NULL,
//       temperature int(11) NOT NULL,
//       createdAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
//       updatedAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
//       userId int(11) DEFAULT NULL,
//       PRIMARY KEY (id),
//       KEY userId (userId),
//       CONSTRAINT betting_idfk_1 FOREIGN KEY (userId) REFERENCES User (id) ON DELETE CASCADE
//     ) ENGINE=InnoDB DEFAULT CHARSET=utf8
//     `
//   );
//   await conn.end();
//   logger.info("DATABASE LOADED");
// };
