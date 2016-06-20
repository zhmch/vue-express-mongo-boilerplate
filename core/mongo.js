"use strict";

let logger 			= require('./logger');
let config 			= require("../config");

let mongoose 		= require("mongoose");
let autoIncrement 	= require('mongoose-auto-increment');

module.exports = function() {
	let db;

	logger.info();

	if (mongoose.connection.readyState !== 1) {
		logger.info("Connecting to Mongo " + config.db.uri + "...");
		db = mongoose.connect(config.db.uri, config.db.options, function(err) {
			if (err) {
				logger.error("Could not connect to MongoDB!");
				return logger.error(err);
			}
		});

		mongoose.connection.on('error', function(err) {
			logger.error("Could not connect to MongoDB!");
			return logger.error(err);
		});

		mongoose.connection.once('open', function() {
			logger.info("\x1b[33;1mMongo DB connected.\x1b[22;39m");
			logger.info();

			if (process.env.NODE_ENV === 'development') {
				require("./seed")();
			}
		});

		autoIncrement.initialize(db);		
		
	} else {
		logger.info("Mongo already connected.");
	}
	
	return db;
};