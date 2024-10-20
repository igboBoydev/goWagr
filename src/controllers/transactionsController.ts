import { IUser, transferData } from "../utils/interface";
import { BaseController } from "../config/helpers";
import { transactionsService } from "../services/transactionsService";

export class TransactionsController extends BaseController {
  private _transactionService = new transactionsService();

  public checkMyBalance = async (id: number) => {
    let res = await this._transactionService.checkMyBalance(id);
    return this.sendResponse(res, res.message, res.code);
  };

  public getRecipientDetails = async (username: string) => {
    let res = await this._transactionService.getRecipientDetails(username);
    return this.sendResponse(res, res.message, res.code);
  };

  public transferMoneyToUser = async (user: IUser, data: transferData) => {
    let res = await this._transactionService.transferMoneyToUser(user, data);
    return this.sendResponse(res, res.message, res.code);
  };

  public getTransferHistory = async (req: any) => {
    let res = await this._transactionService.getTransferHistory(req);
    return this.sendResponse(res, res.message, res.code);
  };
}
