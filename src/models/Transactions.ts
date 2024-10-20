import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database/postgresDB"; // Adjust the path to your actual database config

class Transactions extends Model {
  public id!: number;
  public uuid!: string;
  public amount!: number;
  public beneficiary_id!: number;
  public user_id: number;
  public desc!: string;
  public transfer_type: string;
  public status!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associate(models: any) {
    Transactions.belongsTo(models.Users, {
      foreignKey: "user_id",
      as: "user_transfers",
    });
  }
}

Transactions.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    uuid: new DataTypes.STRING(),
    amount: new DataTypes.INTEGER(),
    user_id: DataTypes.INTEGER.UNSIGNED,
    beneficiary_id: DataTypes.INTEGER.UNSIGNED,
    transfer_type: DataTypes.STRING(),
    desc: new DataTypes.STRING(),
    status: new DataTypes.STRING(),
  },
  {
    tableName: "transactions",
    sequelize, // Passing the `sequelize` instance is required
  }
);

export default Transactions;
