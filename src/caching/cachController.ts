import { CacheService } from "./cachService";

export class CacheController {
  private _cacheService = new CacheService();

  public cacheItem = async (item: any, key: string) => {
    await this._cacheService.setItem(item, key);
  };

  public cacheItems = async (items: any[], key: string) => {
    await this._cacheService.setItem(items, key);
  };

  public getItem = async (key: string) => {
    return await this._cacheService.getItem(key);
  };
}
