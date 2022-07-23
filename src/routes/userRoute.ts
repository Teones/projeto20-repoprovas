import { Router } from "express";

import * as middlewares from "../middlewares/userMiddlewares.js";
import * as controllers from "../controllers/userController.js"

const userRouter = Router();
userRouter.post("/sign-up", middlewares.validateSignUp, controllers.create);
userRouter.post("/sign-in", middlewares.validateSignIn, controllers.login);

export default userRouter;