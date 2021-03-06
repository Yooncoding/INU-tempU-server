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
   * @route POST /betting
   */
  router.post("/", auth.isLogin, BettingValidator.postBetting, async (req, res, next) => {
    try {
      const { id } = req.user;
      const { temperature } = req.body;
      const newBetting = await BettingService.postBetting(id, temperature);

      res.status(201).json(getApi({ suc: true, data: newBetting, mes: "오늘 베팅 제출 완료" }));
    } catch (err) {
      next(err);
    }
  });

  /**
   * @description 오늘 베팅 수정
   * @route PUT /betting
   */
  router.put("/", auth.isLogin, BettingValidator.postBetting, async (req, res, next) => {
    try {
      const { id } = req.user;
      const { temperature } = req.body;
      await BettingService.putBetting(id, temperature);

      res.status(200).json(getApi({ suc: true, mes: "베팅 수정 완료" }));
    } catch (err) {
      next(err);
    }
  });

  /**
   * @description 베팅 결과 확인
   * @route GET /betting/result
   */
  router.get("/result", auth.isLogin, async (req, res, next) => {
    try {
      const { id } = req.user;
      const bettingResult = await BettingService.getBettingResult(id);

      res.status(200).json(getApi({ suc: true, data: bettingResult }));
    } catch (err) {
      next(err);
    }
  });
}

export default bettingRouter;
