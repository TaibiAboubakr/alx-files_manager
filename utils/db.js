#!/usr/bin/node
// utils/db.js
const { MongoClient } = require('mongodb');
require('dotenv').config();

class DBClient {
	constructor() {
		const host = process.env.DB_HOST || 'localhost';
		const port = process.env.DB_PORT || 27017;
		const database = process.env.DB_DATABASE || 'files_manager';
		const uri = `mongodb://${host}:${port}`;

		this.client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
		this.db = null;

		this.client.connect()
			.then(() => {
				this.db = this.client.db(database);
				console.log('Connected successfully to MongoDB');
			})
			.catch(err => {
				console.error('MongoDB connection error:', err);
			});
	}

	isAlive() {
		return this.client.isConnected() && this.db !== null;
	}

	async nbUsers() {
		if (!this.isAlive()) {
			throw new Error('MongoDB client is not connected');
		}
		return this.db.collection('users').countDocuments();
	}

	async nbFiles() {
		if (!this.isAlive()) {
			throw new Error('MongoDB client is not connected');
		}
		return this.db.collection('files').countDocuments();
	}
}

const dbClient = new DBClient();

module.exports = dbClient;
