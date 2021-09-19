import { Router } from "express";
import getApi from "../../utils/customRes";
import auth from "../middlewares/auth";
import MainService from "../../services/main";

const router = Router();

function mainRouter(root) {
  root.use("/main", router);

  /**
   * @description 메인페이지
   * @route GET /main
   */
  router.get("/", auth.isLogin, async (req, res, next) => {
    const { id } = req.user;
    const data = await MainService.getMain(id);

    res.status(200).json(getApi({ suc: true, data }));
  });
}

export default mainRouter;
