import * as express from "express";
import morgan from "morgan";
import routes from "../api";
import config from "../config";
import logger from "../utils/logger";
import CustomError from "../utils/customError";
import getApi from "../utils/customRes";

export default (app) => {
  // middleware
  app.use(morgan("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // router
  app.use(config.api.prefix, routes());
  app.use("/favicon.ico", (req, res) => res.status(204));
  app.use((req, res, next) => {
    const error = new CustomError("NOT_FOUND", 404, "페이지를 찾을 수 없습니다.");
    next(error);
  });

  // error handler
  app.use((err, req, res, next) => {
    res.status(err.status || 500).json(getApi({ suc: false, mes: err.message }));
  });

  logger.info("EXPRESS LOADED");
};
