import { Router } from "express";
import userRouter from "./routes/user";
import moodRouter from "./routes/mood";
import archiveRotuer from "./routes/archive";
import bettingRotuer from "./routes/betting";
import mainRouter from "./routes/main";

const rootRouter = Router();

export default () => {
  userRouter(rootRouter);
  moodRouter(rootRouter);
  archiveRotuer(rootRouter);
  bettingRotuer(rootRouter);
  mainRouter(rootRouter);

  return rootRouter;
};
