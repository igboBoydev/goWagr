import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database/postgresDB"; // Adjust the path to your actual database config

class Wallet extends Model {
  public id!: string;
  public uuid!: string;
  public account_num!: string;
  public user_id!: string;
  public account_name!: string;
  public balance: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associate(models: any) {
    Wallet.belongsTo(models.Users, {
      foreignKey: "user_id",
      as: "user_transfers",
    });
  }
}

Wallet.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    uuid: new DataTypes.STRING(),
    account_num: new DataTypes.STRING(),
    user_id: DataTypes.INTEGER.UNSIGNED,
    account_name: new DataTypes.STRING(),
    balance: new DataTypes.DOUBLE(),
  },
  {
    tableName: "wallet",
    sequelize, // Passing the `sequelize` instance is required
  }
);

export default Wallet;
