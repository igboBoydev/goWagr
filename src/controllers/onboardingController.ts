import { ICode, ICreateUser, ILogin } from "../utils/interface";
import { BaseController } from "../config/helpers";
import { OnboardingService } from "../services/onboardingService";

export class OnboardingController extends BaseController {
  private _onboardingService = new OnboardingService();

  public createAccount = async (data: ICreateUser) => {
    let res = await this._onboardingService.createAccount(data);
    return this.sendResponse(res, res.message, res.code);
  };
  public verifyPhone = async (data: ICode) => {
    let res = await this._onboardingService.verifyPhone(data);
    return this.sendResponse(res, res.message, res.code);
  };
  public verifyEmail = async (data: ICode) => {
    let res = await this._onboardingService.verifyEmail(data);
    return this.sendResponse(res, res.message, res.code);
  };
  public login = async (data: ILogin) => {
    let res = await this._onboardingService.login(data);
    return this.sendResponse(res, res.message, res.code);
  };
}
