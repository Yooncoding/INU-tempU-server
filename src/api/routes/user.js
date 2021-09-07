import { Router } from "express";
import auth from "../middlewares/auth";
const router = Router();

function userRouter(root) {
  root.use("/users", router);

  // TEST ROUTER
  router.post("/login", auth.isStudent, (req, res) => {
    res.send("hello");
  });
}

export default userRouter;
