import { sequelize } from "../database/postgresDB";
import Transactions from "../models/Transactions";
import Users from "../models/Users";
import Wallet from "../models/Wallet";
import { v4 as uuidv4 } from "uuid";
const Queue = require("bull");
require("dotenv").config();

//redis config
const { redis } = require("../");

//producer
const queue = new Queue("process_payment", redis);

//process jobs
queue.process(async (job: any) => {
  //console.log('---------------- job is processing --------------');

  await addJob(job.data);
});

// git clone https://dlakes@bitbucket.org/dlakes/lottos.git

const options = {
  delay: 500,
  attempts: 1,
};

const processJobs = async (data: any) => {
  //Add queue
  queue.add(data, options);
};

const addJob = async (data: any) => {
  let user = await Users.findOne({ where: { id: data.beneficiary_id } });
  await Transactions.create({
    uuid: uuidv4(),
    amount: data.transferData.amount,
    user_id: data.sender_id,
    beneficiary_id: data.beneficiary_id,
    transfer_type: "credit",
    desc: data.transferData.reason,
    status: "success",
  });

  await Transactions.create({
    uuid: uuidv4(),
    amount: data.transferData.amount,
    user_id: data.sender_id,
    beneficiary_id: data.beneficiary_id,
    transfer_type: "debit",
    desc: data.transferData.reason,
    status: "success",
  });

  const recieverTotalCredit = await Transactions.findOne({
    where: { user_id: user.id, transfer_type: "credit" },
    attributes: [[sequelize.fn("SUM", sequelize.col("amount")), "totalAmount"]],
  });
  const recieverTotalDebit = await Transactions.findOne({
    where: { user_id: user.id, transfer_type: "debit" },
    attributes: [[sequelize.fn("SUM", sequelize.col("amount")), "totalAmount"]],
  });

  const senderTotalCredit = await Transactions.findOne({
    where: { user_id: data.sender_id, transfer_type: "credit" },
    attributes: [[sequelize.fn("SUM", sequelize.col("amount")), "totalAmount"]],
  });
  const senderTotalDebit = await Transactions.findOne({
    where: { user_id: data.sender_id, transfer_type: "debit" },
    attributes: [[sequelize.fn("SUM", sequelize.col("amount")), "totalAmount"]],
  });

  let recipientWallet = await Wallet.findOne({ where: { user_id: user.id } });
  let senderWallet = await Wallet.findOne({
    where: { user_id: data.sender_id },
  });

  //   recipientWallet.balance = recipientWallet.balance + (totalCreditDebit.dataValues - totalCreditDebit)

  let senderBalance;
  let recieverBalance;

  if (
    senderTotalDebit.dataValues.totalAmount === null ||
    senderTotalCredit.dataValues.totalAmount === null
  ) {
    return;
  } else {
    senderBalance =
      senderTotalDebit.dataValues.totalAmount +
      senderTotalDebit.dataValues.totalAmount;
    senderBalance = senderBalance - data.transferData.amount;
  }

  if (
    recieverTotalCredit.dataValues.totalAmount === null ||
    recieverTotalDebit.dataValues.totalAmount === null
  ) {
    recieverBalance = data.transferData.amount;
  } else {
    recieverBalance =
      recieverTotalDebit.dataValues.totalAmount +
      recieverTotalDebit.dataValues.totalAmount;
    recieverBalance = recieverBalance + data.transferData.amount;
  }

  senderWallet.balance = senderBalance;
  recipientWallet.balance = recieverBalance;
  await senderWallet.save();
  await recipientWallet.save();

  return;
};

export default processJobs;
