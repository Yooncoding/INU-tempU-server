import { Router } from "express";
const router = Router();

function authRouter(root) {
  root.use("/auth", router);

  // TEST ROUTER
  router.get("/", (req, res) => {
    res.send("hello");
  });
}

export default authRouter;
