import { redis } from "../index";
import { REDIS_URL } from "../config";

const Redis = require("ioredis");

export class CacheService {
  private _redis: any = null;

  public RedisConnect = () => {
    console.log("REDIS CONNECTION SUCCESSFUL");
    this._redis = new Redis(REDIS_URL);

    return this._redis;
  };

  public setItem = async (data: any, key: string) => {
    await redis.set(key, data);
  };

  public getItem = async (key: string) => await redis.get(key);
}
