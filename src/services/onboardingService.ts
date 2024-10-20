import { ICode, ICreateUser, ILogin } from "../utils/interface";
import { BaseController } from "../config/helpers";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import Users from "../models/Users";
import VerificationTokens from "../models/VerificationTokens";
import moment from "moment";
import Wallet from "../models/Wallet";

export class OnboardingService extends BaseController {
  public createAccount = async (data: ICreateUser) => {
    console.log(await this.checkMobile(data.phone));
    if (await this.checkMobile(data.phone)) {
      return {
        message: "User with phone number already exists",
        code: 500,
      };
    }

    if (await this.checkUsername(data.username)) {
      return {
        message: "User with username already exists",
        code: 500,
      };
    }

    if (await this.checkMail(data.email)) {
      return {
        message: "User with email already exists",
        code: 500,
      };
    }

    let createUser = await Users.create({
      uuid: uuidv4(),
      email: data.email,
      phone: data.phone.replace(/^0/, "+234"),
      firstName: data.firstName,
      gender: data.gender,
      username: data.username,
      has_accepted_terms: data.has_accepted_terms,
      referral_link: this.generateId(10),
      lastName: data.lastName,
      password: bcrypt.hashSync(data.password),
    });

    console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk");

    if (createUser) {
      let phone_code = this.generateRandomId(6);
      let email_code = this.generateRandomId(6);
      await Wallet.create({
        uuid: uuidv4(),
        account_num: this.generateRandomId(10),
        user_id: createUser.id,
        account_name: "John Doe",
        balance: 0.0,
      });

      console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj");

      await VerificationTokens.create({
        uuid: uuidv4(),
        code: email_code,
        type: "email",
        user_id: createUser.id,
        is_expired: 0,
        is_used: 0,
        expiry_duration: moment()
          .add(30, "seconds")
          .format("YYYY-MM-DD HH:mm:ss"),
      });
      await VerificationTokens.create({
        uuid: uuidv4(),
        code: phone_code,
        type: "phone",
        user_id: createUser.id,
        is_expired: 0,
        is_used: 0,
        expiry_duration: moment()
          .add(30, "seconds")
          .format("YYYY-MM-DD HH:mm:ss"),
      });

      console.log("================================");
      return {
        uuid: createUser.uuid,
        message:
          "Account created successfully kindly use the token sent to your email address and phone number to validate your account",
        code: 200,
        phone_code,
        email_code,
      };
    }

    return {
      message: "Error occured",
      code: 500,
    };
  };
  public verifyPhone = async (data: ICode) => {
    let user = await Users.findOne({
      where: { phone: data.phone.replace(/^0/, "+234") },
    });

    if (!user) {
      return {
        message: "User not found`",
        code: 502,
      };
    }

    if (user.is_phone_verified === 1) {
      return {
        message: "User phone number already verified",
        code: 200,
      };
    }
    let tokenCheck = await VerificationTokens.findOne({
      where: { code: data.code },
    });

    if (!tokenCheck) {
      return {
        message: "Data does not exist",
        code: 404,
      };
    }

    if (parseInt(tokenCheck.user_id) !== user.id) {
      return {
        message: "Incorrect verification token",
        code: 502,
      };
    }

    if (tokenCheck.type != "phone") {
      let trial_count = tokenCheck.trial_count + 1;

      await VerificationTokens.update(
        { trial_count: trial_count },
        { where: { id: tokenCheck.id } }
      );
      return {
        message: "code cannot be used for this type of verification",
        code: 502,
      };
    }

    if (tokenCheck.is_verified === 1) {
      return {
        message:
          "Phone number already verified, kindly proceed to verify your email",
        code: 500,
      };
    }

    if (tokenCheck.trial_count === 3) {
      await VerificationTokens.create({
        uuid: uuidv4(),
        code: this.generateRandomId(6),
        type: "phone",
        user_id: tokenCheck.user_id,
        is_expired: 0,
        is_used: 0,
        expiry_duration: moment()
          .add(30, "seconds")
          .format("YYYY-MM-DD HH:mm:ss"),
      });
      return {
        message:
          "Code trial exceeded twice, kindly check your phone number for new verification code",
        code: 404,
      };
    }

    if (this.isDatePast(tokenCheck.expiry_duration)) {
      let phone_code = this.generateRandomId(6);
      await VerificationTokens.create({
        uuid: uuidv4(),
        code: phone_code,
        type: "phone",
        user_id: tokenCheck.user_id,
        is_expired: 0,
        is_used: 0,
        expiry_duration: moment()
          .add(30, "seconds")
          .format("YYYY-MM-DD HH:mm:ss"),
      });
      return {
        message:
          "Code expired, kindly check your phone number for new verification code",
        phone_code,
        code: 502,
      };
    }

    await VerificationTokens.update(
      { is_used: 1, is_verified: 1 },
      { where: { uuid: tokenCheck.id } }
    );

    await Users.update(
      { is_phone_verified: 1 },
      { where: { id: tokenCheck.user_id } }
    );

    return {
      message: "Phone number successfully verified",
      code: 200,
    };
  };
  public verifyEmail = async (data: ICode) => {
    let user = await Users.findOne({ where: { email: data.email } });

    if (!user) {
      return {
        message: "User not found`",
        code: 502,
      };
    }

    if (user.is_email_verified === 1) {
      return {
        message: "User email already verified",
        code: 200,
      };
    }
    let tokenCheck = await VerificationTokens.findOne({
      where: { code: data.code },
    });

    if (!tokenCheck) {
      return {
        message: "Data does not exist",
        code: 404,
      };
    }

    if (parseInt(tokenCheck.user_id) !== user.id) {
      return {
        message: "Incorrect verification token",
        code: 502,
      };
    }

    if (tokenCheck.type != "email") {
      let trial_count = tokenCheck.trial_count + 1;

      await VerificationTokens.update(
        { trial_count: trial_count },
        { where: { id: tokenCheck.id } }
      );
      return {
        message: "code cannot be used for this type of verification",
        code: 502,
      };
    }

    if (tokenCheck.is_verified === 1) {
      return {
        message:
          "email already verified, kindly proceed to uploading your documents",
        code: 500,
      };
    }

    console.log("9999999999999999999999999999999999999999999");

    if (tokenCheck.trial_count === 3) {
      await VerificationTokens.create({
        uuid: uuidv4(),
        code: this.generateRandomId(6),
        type: "email",
        user_id: tokenCheck.user_id,
        is_expired: 0,
        is_used: 0,
        expiry_duration: moment()
          .add(30, "seconds")
          .format("YYYY-MM-DD HH:mm:ss"),
      });
      return {
        message:
          "Code trial exceeded twice, kindly check your phone number for new verification code",
        code: 404,
      };
    }

    console.log(
      "Ppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppp"
    );

    if (this.isDatePast(tokenCheck.expiry_duration)) {
      let email_code = this.generateRandomId(6);
      await VerificationTokens.create({
        uuid: uuidv4(),
        code: email_code,
        type: "email",
        user_id: tokenCheck.user_id,
        is_expired: 0,
        is_used: 0,
        expiry_duration: moment()
          .add(30, "seconds")
          .format("YYYY-MM-DD HH:mm:ss"),
      });
      return {
        message:
          "Code expired, kindly check your phone number for new verification code",
        email_code,
        code: 502,
      };
    }

    console.log("oooooooooooooooooooooooooooooooo");

    await VerificationTokens.update(
      { is_used: 1, is_verified: 1 },
      { where: { id: tokenCheck.id } }
    );

    await Users.update(
      { is_email_verified: 1 },
      { where: { id: tokenCheck.user_id } }
    );

    return {
      message: "Email successfully verified",
      code: 200,
    };
  };

  public login = async (body: ILogin) => {
    const { email, password } = body;

    let user = await Users.findOne({ where: { email } });

    if (!user) {
      return { message: "Account does not exist", code: 401 };
    }

    if (bcrypt.compareSync(password, user.password)) {
      if (user.is_locked === 1) {
        return {
          code: 501,
          message: "Your account has been locked, kindly contact support",
        };
      }

      if (user.is_email_verified === 0 || user.is_phone_verified === 0) {
        return {
          code: 501,
          message: `Your ${
            user.is_email_verified === 0
              ? "email is unverified"
              : user.is_phone_verified === 0
              ? "Phone is unverified"
              : ""
          } kindly complete your verification`,
        };
      }

      const token = await this.generateCookieToken(user);

      return {
        code: 200,
        message: "Logged in successfully",
        data: { token },
      };
    }

    return {
      code: 500,
      message: "Incorrect email or password",
    };
  };
}
