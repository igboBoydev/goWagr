import { Router, Request, Response, NextFunction } from "express";
import { OnboardingController } from "../controllers/onboardingController";
import { controllerHandler } from "../config/controllerHandler";

// import { AccountController } from "../../../api/Account/accountController";

const onboardingRoute = Router();
const call = controllerHandler;
const OnbaordingController = new OnboardingController();

onboardingRoute.post(
  "/users",
  call(
    OnbaordingController.createAccount,
    (req: Request, res: Response, next: NextFunction) => [req.body]
  )
);
onboardingRoute.post(
  "/verify-email",
  call(
    OnbaordingController.verifyEmail,
    (req: Request, res: Response, next: NextFunction) => [req.body]
  )
);
onboardingRoute.post(
  "/verify-phone",
  call(
    OnbaordingController.verifyPhone,
    (req: Request, res: Response, next: NextFunction) => [req.body]
  )
);
onboardingRoute.post(
  "/login",
  call(
    OnbaordingController.login,
    (req: Request, res: Response, next: NextFunction) => [req.body]
  )
);

export default onboardingRoute;
