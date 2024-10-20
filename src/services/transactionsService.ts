import { IUser, transferData } from "../utils/interface";
import { BaseController } from "../config/helpers";
import Transactions from "../models/Transactions";
import { sequelize } from "../database/postgresDB";
import Users from "../models/Users";
import Wallet from "../models/Wallet";
import ProcessPaymentJob from "../Queues/initializePayment";

export class transactionsService extends BaseController {
  public checkMyBalance = async (id: number) => {
    console.log({ id });

    let num: number = +id;
    let user = await Users.findOne({ where: { id: num } });

    if (!user) {
      return {
        code: 404,
        message: "User not found",
      };
    }
    const totalCredit = await Transactions.findOne({
      where: { user_id: user.id, transfer_type: "credit" },
      attributes: [
        [sequelize.fn("SUM", sequelize.col("amount")), "totalAmount"],
      ],
    });
    const totalDebit = await Transactions.findOne({
      where: { user_id: user.id, transfer_type: "debit" },
      attributes: [
        [sequelize.fn("SUM", sequelize.col("amount")), "totalAmount"],
      ],
    });

    console.log({
      totalCredit: totalCredit.dataValues.totalAmount,
      totalDebit: totalDebit.dataValues.totalAmount,
    });

    let balance;

    if (
      totalCredit.dataValues.totalAmount === null ||
      totalCredit.dataValues.totalAmount === null
    ) {
      balance = 0;
    } else {
      balance =
        totalDebit.dataValues.totalAmount + totalCredit.dataValues.totalAmount;
    }
    let details = {
      firstName: user.firstName,
      lastName: user.lastName,
      gender: user.gender,
      phone: user.phone,
      email: user.email,
      is_email_verified: user.is_email_verified,
      is_phone_verified: user.is_phone_verified,
      is_locked: user.is_locked,
      referer_id: user.referer_id,
      balance,
    };

    return {
      code: 200,
      message: "success",
      data: details,
    };
  };

  public getRecipientDetails = async (username: string) => {
    console.log(username);
    let user = await Users.findOne({ where: { username: username } });
    if (!user) {
      return {
        code: 404,
        message: "User not found",
      };
    }

    let userWallet: any = await Wallet.findOne({
      where: { user_id: user.id },
    });

    let details = {
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      email: user.email,
      Wallet: {
        account_num: userWallet.account_num,
        account_name: userWallet.account_name,
      },
      //   balance,
    };

    return {
      code: 200,
      message: "success",
      data: details,
    };
  };

  public transferMoneyToUser = async (
    user: IUser,
    transferData: transferData
  ) => {
    let recipient = await Users.findOne({
      where: { username: transferData.username },
    });

    if (!recipient) {
      return {
        code: 404,
        message: "User not found",
      };
    }

    if (user.username === transferData.username) {
      return {
        code: 501,
        message: "Cannot transfer funds to self",
      };
    }

    let data = {
      transferData,
      beneficiary_id: recipient.id,
      transfer_type: "payment",
      sender_id: user.id,
    };

    ProcessPaymentJob(data);

    return {
      code: 200,
      message: "Transaction is being processed",
    };
  };

  public getTransferHistory = async (req: any) => {
    const { pageNum, pageSize } = req.query;

    if (!pageNum || isNaN(pageNum) || !pageSize || isNaN(pageSize)) {
      return {
        code: 501,
        message: "Kindly add a valid page number and page size",
      };
    }

    var currentPage = parseInt(pageNum) ? parseInt(pageNum) : 1;

    var page = currentPage - 1;
    const offset = page * pageSize;
    const limit = pageSize;

    let allTransactions = await Transactions.findAndCountAll({
      offset: offset,
      limit: limit,
      order: [["id", "DESC"]],
    });

    var next_page = currentPage + 1;
    var prev_page = currentPage - 1;
    var nextP = `/api/jetwest/admin/all-scheduled-flights?pageNum=` + next_page;
    var prevP = `/api/jetwest/admin/all-scheduled-flights?pageNum=` + prev_page;

    return {
      code: 200,
      message: "success",
      data: {
        status: "SUCCESS",
        data: allTransactions,
        per_page: pageSize,
        current_page: currentPage,
        first_page_url: `/api/jetwest/admin/all-scheduled-flights?pageNum=1`,
        next_page_url: nextP,
        prev_page_url: prevP,
        path: `/api/jetwest/admin/all-scheduled-flights?pageNum=`,
        from: 1,
      },
    };
  };
}
