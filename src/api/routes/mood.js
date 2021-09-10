import { Router } from "express";
import getApi from "../../utils/customRes";
import auth from "../middlewares/auth";
import MoodService from "../../services/mood";

const router = Router();

function moodRouter(root) {
  root.use("/mood", router);

  /**
   * @description 오늘 제출한 기분 조회
   * @route GET /mood
   */
  router.get("/", auth.isLogin, async (req, res, next) => {
    try {
      const { id } = req.user;
      const mood = await MoodService.getMoodByUser(id);

      res.status(200).json(getApi({ suc: true, data: mood }));
    } catch (err) {
      next(err);
    }
  });
}

export default moodRouter;
