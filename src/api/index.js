import { Router } from "express";
import authRouter from "./routes/auth";

const rootRouter = Router();

export default () => {
  authRouter(rootRouter);

  return rootRouter;
};
