import { Router } from "express";
import getApi from "../../utils/customRes";
import auth from "../middlewares/auth";
import UserService from "../../services/user";
import UserValidator from "../middlewares/validators/user/validator";

const router = Router();

function userRouter(root) {
  root.use("/users", router);

  /**
   * @description 로그인
   * @route POST /users/login
   */
  router.post("/login", auth.isStudent, async (req, res, next) => {
    try {
      const { id } = req.body;
      const token = await UserService.login(id);

      res.status(201).json(getApi({ suc: true, data: token }));
    } catch (err) {
      next(err);
    }
  });

  /**
   * @description 프로필 수정하기 내 정보
   * @route GET /users/me/edit
   */
  router.get("/me/edit", auth.isLogin, async (req, res, next) => {
    try {
      const { user } = req;

      res.status(200).json(getApi({ suc: true, data: user }));
    } catch (err) {
      next(err);
    }
  });

  /**
   * @description 프로필 수정하기 제출
   * @route POST /users/me/edit
   */
  router.post("/me/edit", auth.isLogin, UserValidator.postEdit, async (req, res, next) => {
    try {
      const { id } = req.user;
      const { nickname } = req.body;
      await UserService.postEdit(id, nickname);

      res.status(200).json(getApi({ suc: true, mes: "닉네임 변경 완료" }));
    } catch (err) {
      next(err);
    }
  });

  /**
   * @description 포인트 랭킹
   * @route GET /users/rank
   */
  router.get("/rank", auth.isLogin, async (req, res, next) => {
    try {
      const { id } = req.user;
      const usersRank = await UserService.getUsersRank(id);

      res.status(200).json(getApi({ suc: true, data: usersRank }));
    } catch (err) {
      next(err);
    }
  });

  /**
   * @description 유저 프로필 조회
   * @route GET /users/:userId
   */
  router.get("/:userId", auth.isLogin, async (req, res, next) => {
    try {
      const { userId } = req.params;
      const user = await UserService.getUser(userId);

      res.status(200).json(getApi({ suc: true, data: user }));
    } catch (err) {
      next(err);
    }
  });
}

export default userRouter;
