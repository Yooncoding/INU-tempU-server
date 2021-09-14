import { Router } from "express";
import getApi from "../../utils/customRes";
import auth from "../middlewares/auth";
import BettingService from "../../services/betting";

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
}

export default bettingRouter;
