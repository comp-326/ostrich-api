import { Router, Application } from "express";
import { VERSION } from "./../../../config";
import register from "../controllers/register";
import logout from "../controllers/logout";
import updateAccount from "../controllers/updateAccount";
import getUserById from "../controllers/getUserById";
import verifyAccountmail from "../controllers/verifyAccountMail";
import getAllUsers from "../controllers/getAllUsers";
import {
  checkConfirmPasswordEmpty,
  checkEmailIfEmailExists,
  checkEmptyEmailField,
  checkEmptyUsernameEmpty,
  checkFirstNameEmpty,
  checkGenderEmptyField,
  checkPasswordConfirmPasswordEqual,
  checkLastNameEmpty,
  checkPasswordEmpty,
  checkUsernameExist,
  checkPasswordRegex,
  checkAccountConfirmed,
  checkEmailOrUsername,
} from "./../middlewares/accountMiddlewares";
import login from "../controllers/login";
import generateMailConfirmationLink from "../controllers/generateMailConfirmationLink";

const authRouter = ({ app }: { app: Application }) => {
  const router = Router();
  router.post(
    "/register",
    checkEmptyEmailField,
    checkEmailIfEmailExists,
    checkUsernameExist,
    checkEmptyUsernameEmpty,
    checkFirstNameEmpty,
    checkLastNameEmpty,
    checkGenderEmptyField,
    checkPasswordEmpty,
    checkPasswordRegex,
    checkConfirmPasswordEmpty,
    checkPasswordConfirmPasswordEqual,
    register
  );
  router.post(
    "/login",
    checkEmailOrUsername,
    checkPasswordEmpty,
    checkAccountConfirmed,
    login
  );
  router.post("/logout", logout);
  router.get("/verify/:token", verifyAccountmail);
  router.post("/generateverificationLink/", generateMailConfirmationLink);
  router.post("/confirm/mail", logout);
  router.put("/account/update", updateAccount);
  router.get("/users", getAllUsers);
  router.get("/users/:id", getUserById);
  app.use(`/${VERSION}/auth`, router);
  return app;
};

export default authRouter;
