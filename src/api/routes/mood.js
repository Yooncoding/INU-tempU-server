import { Router } from "express";
import getApi from "../../utils/customRes";
import auth from "../middlewares/auth";
import MoodService from "../../services/mood";
import MoodValidator from "../middlewares/validators/mood/validator";

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
      const mood = await MoodService.getMoodToday(id);

      res.status(200).json(getApi({ suc: true, data: mood }));
    } catch (err) {
      next(err);
    }
  });

  /**
   * @description 오늘 기분 제출
   * @route POST /mood
   */
  router.post("/", auth.isLogin, MoodValidator.postMood, async (req, res, next) => {
    try {
      const { id } = req.user;
      const { temperature, description } = req.body;
      const mood = await MoodService.getMoodToday(id);
      if (mood) return res.status(200).json(getApi({ suc: true, data: mood, mes: "오늘 기분 이미 제출" }));

      const newMood = await MoodService.postMood(id, temperature, description);
      res.status(201).json(getApi({ suc: true, data: newMood, mes: "오늘 기분 제출 완료" }));
    } catch (err) {
      next(err);
    }
  });

  /**
   * @description 내가 제출한 기분들 조회
   * @route GET /mood/archive
   */
  router.get("/archive", auth.isLogin, async (req, res, next) => {
    try {
      const { id } = req.user;
      const { y, m } = req.query;
      const archive = await MoodService.getArchiveMe(id, y, m);

      res.status(200).json(getApi({ suc: true, data: archive }));
    } catch (err) {
      next(err);
    }
  });

  /**
   * @description 내가 제출한 기분 조회
   * @route GET /mood/:moodId
   */
  router.get("/:moodId", auth.isLogin, async (req, res, next) => {
    try {
      const { id } = req.user;
      const { moodId } = req.params;
      const mood = await MoodService.getMoodByUser(id, moodId);

      res.status(200).json(getApi({ suc: true, data: mood }));
    } catch (err) {
      next(err);
    }
  });

  /**
   * @description 제출한 기분 수정
   * @route PUT /mood/:moodId
   */
  router.put("/:moodId", auth.isLogin, MoodValidator.postMood, async (req, res, next) => {
    try {
      const { id } = req.user;
      const { moodId } = req.params;
      const { temperature, description } = req.body;
      await MoodService.putMood(id, moodId, temperature, description);

      res.status(200).json(getApi({ suc: true, mes: "기분 수정 완료" }));
    } catch (err) {
      next(err);
    }
  });
}

export default moodRouter;
