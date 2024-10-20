import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database/postgresDB"; // Adjust the path to your actual database config

class Oauth extends Model {
  public no!: number;
  public id!: string;
  public email!: string;
  public iat!: number;
  public exp!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static associate(models: any) {}
}

Oauth.init(
  {
    no: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    id: new DataTypes.STRING(),
    email: new DataTypes.STRING(),
    iat: new DataTypes.INTEGER(),
    exp: new DataTypes.INTEGER(),
  },
  {
    tableName: "oauth",
    sequelize, // Passing the `sequelize` instance is required
  }
);

export default Oauth;
