import * as dotenv from "dotenv";
dotenv.config();
export const PORT = process.env.PORT || "";
export const ENVIRONMENT = process.env.NODE_ENV || "";
export const APP_URL = process.env.APP_URL || "";
export const BASE_PATH = process.env.BASE_PATH || "";
export const DB_NAME = process.env.POSTGRES_DB || "";
export const DB_USER = process.env.DB_USER || "";
export const DB_PASSWORD = process.env.POSTGRES_PASSWORD || "";
export const DB_HOST = process.env.DB_HOST || "";
export const JWT_SECRET = process.env.JWT_SECRET || "";
export const EMAIL_USERNAME = process.env.EMAIL_USERNAME || "";
export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD || "";
export const SMTP_USERNAME = process.env.SMTP_USERNAME || "";
export const REDIS_PASSWORD = process.env.REDIS_PASSWORD || "";
export const REDIS_HOST = process.env.REDIS_HOST || "";
export const REDISHOST = process.env.REDISHOST || "";
export const REDIS_PORT = process.env.REDIS_PORT || "redis";
export const REDIS_URL = process.env.REDIS_URL || "redis";
export const DATABASE_URL = process.env.DATABASE_URL || "";
export const FLUTTERWAVE_SECRET = process.env.FLUTTERWAVE_SECRET || "";
export const FLUTTERWAVE_URL = process.env.FLUTTERWAVE_URL || "";
export const FLUTTERWAVE_PUBLIC = process.env.FLUTTERWAVE_PUBLIC || "";
export const SMTP_PASSWORD = process.env.SMTP_PASSWORD || "";
export const SECRET = process.env.SECRET || "";
