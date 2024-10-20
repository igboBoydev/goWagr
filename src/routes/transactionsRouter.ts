import { Router, Request, Response, NextFunction } from "express";
import { TransactionsController } from "../controllers/transactionsController";
import { controllerHandler } from "../config/controllerHandler";
import passport from "passport";
const jwtMiddleWare = passport.authenticate("jwt", { session: false });
// import { AccountController } from "../../../api/Account/accountController";

const transactionsRoute = Router();
const call = controllerHandler;
const _transactionsController = new TransactionsController();

transactionsRoute.get(
  "/users/:id",
  jwtMiddleWare,
  call(
    _transactionsController.checkMyBalance,
    (req: Request, res: Response, next: NextFunction) => [req.params.id]
  )
);
transactionsRoute.get(
  "/get-user-by-username/users/:username",
  jwtMiddleWare,
  call(
    _transactionsController.getRecipientDetails,
    (req: Request, res: Response, next: NextFunction) => [req.params.username]
  )
);
transactionsRoute.post(
  "/transfers",
  jwtMiddleWare,
  call(
    _transactionsController.transferMoneyToUser,
    (req: Request, res: Response, next: NextFunction) => [req.user, req.body]
  )
);

transactionsRoute.get(
  "/transfers",
  jwtMiddleWare,
  call(
    _transactionsController.getTransferHistory,
    (req: Request, res: Response, next: NextFunction) => [req]
  )
);

export default transactionsRoute;
