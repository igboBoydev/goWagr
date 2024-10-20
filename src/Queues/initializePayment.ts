import Wallet from "../models/Wallet";

export {};
const Queue = require("bull");
import processJobs from "./processPayment";
require("dotenv").config();
const { redis } = require("../");

//redis config

//producer
const queue = new Queue("initialize_payment", redis);

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

const ProcessPaymentJob = async (data: any) => {
  //Add queue

  queue.add(data, options);
};

const addJob = async (data: any) => {
  let userWallet: any = await Wallet.findOne({
    where: { user_id: data.sender_id },
  });

  let balanceCheck = userWallet.balance - data.transferData.amount;

  if (balanceCheck < 0) {
    return;
  }
  processJobs(data);
  return;
};

export default ProcessPaymentJob;
