import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database/postgresDB"; // Adjust the path to your actual database config

class Users extends Model {
  public id!: number;
  public uuid!: string;
  public firstName!: string;
  public lastName!: string;
  public phone!: string;
  public email!: string;
  public is_email_verified!: number;
  public is_phone_verified!: number;
  public password!: string;
  public referral_link!: string;
  public gender!: string;
  public is_locked!: number;
  public username: string;
  public has_accepted_terms!: boolean;
  public referer_id!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associate(models: any) {
    Users.hasMany(models.Transfers, {
      foreignKey: "user_id",
      as: "user_transfers",
    });
    Users.hasMany(models.Wallet, {
      foreignKey: "user_id",
      as: "user_wallet",
    });
  }
}

Users.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    uuid: new DataTypes.STRING(),
    firstName: new DataTypes.STRING(),
    lastName: new DataTypes.STRING(),
    gender: new DataTypes.STRING(),
    username: new DataTypes.STRING(),
    phone: new DataTypes.STRING(),
    email: new DataTypes.STRING(),
    is_email_verified: new DataTypes.INTEGER(),
    is_phone_verified: new DataTypes.INTEGER(),
    is_locked: new DataTypes.INTEGER(),
    referer_id: DataTypes.INTEGER.UNSIGNED,
    password: new DataTypes.STRING(),
    has_accepted_terms: new DataTypes.BOOLEAN(),
  },
  {
    tableName: "users",
    sequelize, // Passing the `sequelize` instance is required
  }
);

export default Users;
