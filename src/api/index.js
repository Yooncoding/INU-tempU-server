import { Router } from "express";
import userRouter from "./routes/user";
import moodRouter from "./routes/mood";
import archiveRotuer from "./routes/archive";
import bettingRotuer from "./routes/betting";

const rootRouter = Router();

export default () => {
  userRouter(rootRouter);
  moodRouter(rootRouter);
  archiveRotuer(rootRouter);
  bettingRotuer(rootRouter);

  return rootRouter;
};
