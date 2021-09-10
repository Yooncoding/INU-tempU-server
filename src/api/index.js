import { Router } from "express";
import userRouter from "./routes/user";
import moodRouter from "./routes/mood";

const rootRouter = Router();

export default () => {
  userRouter(rootRouter);
  moodRouter(rootRouter);

  return rootRouter;
};
