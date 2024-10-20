export interface ICreateUser {
  email: string;
  phone: string;
  password: string;
  firstName: string;
  company_name: string;
  username: string;
  lastName: string;
  has_accepted_terms: boolean;
  gender: string;
}

export interface ICode {
  code: string;
  email: string;
  phone: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IUser {
  id: number;
  uuid: string;
  firstName: string;
  lastName: string;
  gender: string;
  phone: string;
  username: string;
  email: string;
  is_email_verified: number;
  is_phone_verified: number;
  is_locked: number;
  referer_id: number;
  password: string;
  has_accepted_terms: boolean;
}

export interface transferData {
  username: string;
  amount: number;
  reason: string;
}

export interface Transfers {
  id: number;
  uuid: string;
  amount: string;
  beneficiary_Id: number;
  desc: string;
  status: string;
}
