# Getting started

To get the Node server running locally:

- Clone this repo
- `npm install` to install all required dependencies
- Install MongoDB and run it by executing `mongod`
- `npm run start` to start the local server

# Code Overview

## Dependencies

- [expressjs](https://github.com/expressjs/express) - The server for handling and routing HTTP requests
- [mongoose](https://github.com/Automattic/mongoose) - For modeling and mapping MongoDB data to javascript 

## Application Structure

- `index.js` - The entry point to our application. This file defines our express server and connects it to MongoDB using mongoose. It also requires the routes and models we'll be using in the application.
- `config/` - This folder contains configuration for mongo.
- `routes/` - This folder contains the route definitions for our API.
- `models/` - This folder contains the schema definitions for our Mongoose models.

## Routes
- (Method : Get) `/trades` - List all the trades 
- (Method : Delete) `/erase` - Delete all the trades
- (Method : Post) `/trades` - Create new trade
- `Request Body` - `{
					"type":"sell",
					"user":{
							"id":1,
					  		"name":"test"
						 },
					"symbol":"stock",
					"shares":10,
					"price":131.33  
					}`
- (Method : Get) `/trades/users/:userId` - List all the trades of a user
- (Method : Get) `/stocks/:symbol/trades?type={tradeType}&start={startDate}&end={endDate}` - List all the trades which are associated with the stock symbol and the given trade type in given date range
- (Method : Get) `/stocks/:symbol/price?start={startDate}&end={endDate}` - It will return the highest and lowest price for the stock symbol in the given date range


