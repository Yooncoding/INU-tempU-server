import { Router } from "express";
import getApi from "../../utils/customRes";
import auth from "../middlewares/auth";
import UserService from "../../services/user";

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
}

export default userRouter;
