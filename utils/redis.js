import { createClient } from 'redis';
import { promisify } from 'util';

// class to define methods for commonly used redis commands
class RedisClient {
  constructor() {
    this.client = createClient();
    this.client.on('error', (err) => {
      console.log(`Redis client not connected to server: ${err}`);
    });
  }

  // check connection status and report
  isAlive() {
    if (this.client.connected) {
      return true;
    }
    return false;
  }

  // get value for given key from redis server
  async get(key) {
    const GetVal = promisify(this.client.get).bind(this.client);
    const value = await GetVal(key);
    return value;
  }

  // set key value pair to redis server
  async set(key, value, time) {
    const SetVal = promisify(this.client.set).bind(this.client);
    await SetVal(key, value);
    await this.client.expire(key, time);
  }

  // del key vale pair from redis server
  async del(key) {
    const DelVal = promisify(this.client.del).bind(this.client);
    await DelVal(key);
  }
}

const redisClient = new RedisClient();

module.exports = redisClient;
