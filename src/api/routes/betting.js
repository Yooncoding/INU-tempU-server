import { Router } from "express";
import getApi from "../../utils/customRes";
import auth from "../middlewares/auth";
import BettingService from "../../services/betting";
import BettingValidator from "../middlewares/validators/betting/validator";

const router = Router();

function bettingRouter(root) {
  root.use("/betting", router);

  /**
   * @description 오늘 제출한 베팅 조회
   * @route GET /betting
   */
  router.get("/", auth.isLogin, async (req, res, next) => {
    try {
      const { id } = req.user;
      const betting = await BettingService.getBetting(id);

      res.status(200).json(getApi({ suc: true, data: betting }));
    } catch (err) {
      next(err);
    }
  });

  /**
   * @description 오늘 베팅 제출
   * @route POSt /betting
   */
  router.post("/", auth.isLogin, BettingValidator.postBetting, async (req, res, next) => {
    try {
      const { id } = req.user;
      const { temperature } = req.body;
      const newBetting = await BettingService.postBetting(id, temperature);

      res.status(201).json(getApi({ suc: true, data: newBetting, mes: "오늘 기분 제출 완료" }));
    } catch (err) {
      next(err);
    }
  });
}

export default bettingRouter;
