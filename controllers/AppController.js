#!/usr/bin/node
const redisClient = require('../utils/redis');
const dbClient = require('../utils/db');

class AppController {
  static getStatus(req, res) {
    res.status(200).json({ redis: redisClient.isAlive(), db: dbClient.isAlive() });
  }

  static async getStats(req, res) {
    const usersNum = await dbClient.nbUsers();
    const filesNum = await dbClient.nbFiles();
    res.status(200).json({ users: usersNum, files: filesNum });
  }
}

module.exports = AppController;
