import moment from "moment";
import jwt from "jsonwebtoken";
import { SECRET } from ".";
import Users from "../models/Users";
import Oauth from "../models/Oauth";
import { IUser } from "../utils/interface";
import { jwtDecode } from "jwt-decode";

export class BaseController {
  public sendResponse(
    data: any,
    message: string,
    statusCode: number,
    status = true
  ) {
    return { data, message, statusCode, status };
  }

  public checkMobile = async (phone: string) => {
    return await Users.findOne({ where: { phone: phone } });
  };

  public checkUsername = async (username: string) => {
    return await Users.findOne({ where: { username: username } });
  };

  public generateCookieToken = async (user: IUser) => {
    let param = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      phone_number: user.phone,
    };
    let token = jwt.sign(param, SECRET, {
      expiresIn: 1800,
    });

    var decoded: any = jwtDecode(token);
    Oauth.create(decoded);

    console.log({ token });

    return token;
  };

  public isDatePast = (date: string) => {
    const dateToCheck = moment(date);

    // Get the current date and time
    const now = moment();

    // Check if the date is in the past
    const isInThePast = dateToCheck.isBefore(now);

    return isInThePast;
  };

  public generateRandomId = (length: number) => {
    var result = "";
    var characters = "123456789123456789123456789";
    var charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  };

  public generateRef = (length: number) => {
    var result = "";
    var characters =
      "1234567890BCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0987654321";
    var charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  };

  public generateId = (length: number) => {
    var result = "";
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    var charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  };

  public checkMail = async (email: string) => {
    return await Users.findOne({ where: { email: email } });
  };
}
