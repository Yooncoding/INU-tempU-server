import dotenv from "dotenv";

process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config();
if (envFound.error) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  // port
  port: parseInt(process.env.PORT),

  // database
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  db: {
    host: process.env.DB_HOST,
    timezone: "+09:00",
    dialect: "mysql",
    logging: false,
  },

  // token
  jwtSecret: process.env.JWT_SECRET,

  // api
  api: { prefix: "/api" },

  login: {
    method: process.env.LOGIN_METHOD,
    url: process.env.LOGIN_URL,
    headers: {
      "Content-Type": process.env.LOGIN_CONTENT_TYPE,
    },
  },
};
