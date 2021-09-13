import { Router } from "express";
import getApi from "../../utils/customRes";
import auth from "../middlewares/auth";
import ArchiveService from "../../services/archive";
import ArchiveValidator from "../middlewares/validators/archive/validator";

const router = Router();

function archiveRouter(root) {
  root.use("/archive", router);

  /**
   * @description 내가 제출한 기분들 조회
   * @route GET /archive/me
   */
  router.get("/me", ArchiveValidator.getArchive, auth.isLogin, async (req, res, next) => {
    try {
      const { id } = req.user;
      const { y, m } = req.query;
      const archive = await ArchiveService.getArchiveMe(id, y, m);

      res.status(200).json(getApi({ suc: true, data: archive }));
    } catch (err) {
      next(err);
    }
  });

  /**
   * @description 학생들이 제출한 기분들 조회
   * @route GET /archive/inu
   */
  router.get("/inu", ArchiveValidator.getArchive, auth.isLogin, async (req, res, next) => {
    try {
      const { y, m } = req.query;
      const archive = await ArchiveService.getArchiveInu(y, m);

      res.status(200).json(getApi({ suc: true, data: archive }));
    } catch (err) {
      next(err);
    }
  });
}

export default archiveRouter;
