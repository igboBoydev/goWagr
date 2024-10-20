import { Sequelize } from "sequelize";
import { DATABASE_URL } from "../config";

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
  define: {
    freezeTableName: true,
  },
  // dialectOptions: {
  //   ssl: {
  //     require: true, // Enforce SSL connection
  //     rejectUnauthorized: false, // Accept self-signed certificates (set to true if needed)
  //   }, // postgresql://pc:gqVd1EpCiEBWKXr2jGcc89X0Sc5Im9ei@dpg-cremiibgbbvc73bs4ro0-a/audafrom_xfx7
  // },
  logging: false, // Disable logging here
});

export { sequelize };
