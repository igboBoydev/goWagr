import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database/postgresDB"; // Adjust the path to your actual database config

class VerificationTokens extends Model {
  public id!: number;
  public uuid!: string;
  public code!: string;
  public type!: string;
  public user_id!: string;
  public trial_count!: number;
  public is_expired!: number;
  public is_retry!: number;
  public is_delivered!: number;
  public is_verified!: number;
  public is_used!: number;
  public expiry_duration!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // public static associate(models: any) {
  //   User.hasMany(models.Task, {
  //     foreignKey: "userId",
  //     as: "tasks",
  //   });
  // }
}

VerificationTokens.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    uuid: new DataTypes.STRING(),
    code: new DataTypes.STRING(),
    type: new DataTypes.STRING(),
    user_id: new DataTypes.STRING(),
    is_verified: new DataTypes.INTEGER(),
    is_expired: new DataTypes.INTEGER(),
    is_delivered: new DataTypes.INTEGER(),
    is_retry: new DataTypes.INTEGER(),
    is_used: new DataTypes.INTEGER(),
    trial_count: new DataTypes.INTEGER(),
    expiry_duration: new DataTypes.STRING(),
  },
  {
    tableName: "verification_tokens",
    sequelize, // Passing the `sequelize` instance is required
  }
);

export default VerificationTokens;
