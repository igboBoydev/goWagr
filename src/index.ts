import dotenv from "dotenv";
dotenv.config();
require("./database/postgresDB");
import { Server } from "http";
import { PORT } from "./config";
import { CacheService } from "./caching/cachService";

import server from "./utils/server";
const http = new Server(server);

var cache = new CacheService();
const redis = cache.RedisConnect();

let API = http.listen(PORT || 2023, () => {
  console.log(`Server started on port ${PORT}`);
});

export { redis, API };
