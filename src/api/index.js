import { Router } from "express";
import userRouter from "./routes/user";

const rootRouter = Router();

export default () => {
  userRouter(rootRouter);

  return rootRouter;
};
