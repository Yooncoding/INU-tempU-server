import { Router } from "express";
import userRouter from "./routes/user";
import moodRouter from "./routes/mood";
import archiveRotuer from "./routes/archive";

const rootRouter = Router();

export default () => {
  userRouter(rootRouter);
  moodRouter(rootRouter);
  archiveRotuer(rootRouter);

  return rootRouter;
};
