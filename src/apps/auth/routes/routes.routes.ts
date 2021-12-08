import { Router, Application } from "express";
import { VERSION } from "./../../../config";
import register from "../controllers/register";
import logout from "../controllers/logout";
import updateAccount from "../controllers/updateAccount";
import getUserById from "../controllers/getUserById";
import getAllUsers from "../controllers/getAllUsers";

const authRouter = ({ app }: { app: Application }) => {
  const router = Router();
  router.post("/register", register);
  router.post("/login", register);
  router.post("/logout", logout);
  router.put("/account/update", updateAccount);
  router.get("/users", getAllUsers);
  router.get("/users/:id", getUserById);
  app.use(`/${VERSION}/auth`, router);
  return app;
};

export default authRouter;
