const Trade = require('../models/trades.js');
const mongoose = require('mongoose');
const moment = require('moment');

// Create and Save a new Trade
const create = (req, res) => {

let {body : data} = req;
    //Validate request
    if(!data) {
        return res.status(400).send({
            message: "Trade content can not be empty"
        });
    }

    data = {_id: data.id || new mongoose.Types.ObjectId ,...data};
    // Create a Trade
    const trade = new Trade(data);

    // Save Trade in the database
    trade.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        if(err.code == 11000){
            res.status(400).send({
                message: err.message || "Some error occurred while creating the trade."
            });
        }
        res.status(500).send({
            message: err.message || "Some error occurred while creating the trade."
        });
    });
};

// Retrieve and return all trades from the database.
const findAll = (req, res) => {
Trade.find(null,null, {sort: {'_id': 1}})
    .then(trades => {
        res.json(trades);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving trades."
        });
    });
};

// Find a single trade with a userid
const findByUserId = (req, res) => {
    Trade.find({"user.id":req.params.userId},null, {sort: {'_id': 1}})
        .then(trade => {
    
            if(trade.length==0){
                res.status(400).send({
                    message: "No record found."
                }).end();
            }else{
                res.json(trade);
            }
            
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving trades."
            });
        });
};

// Find a trade identified by the stock in the request
const findByStock = (req, res) => {
const type = req.query.type;

Trade.find({
      $and: [
         {"symbol":req.params.symbol},{"type":type}, {createdAt : {
    '$gte': new Date(req.query.start),
    '$lte': new Date(req.query.end)}
}
      ]
   })
        .then(trade => {
    
            if(trade.length==0){
                res.status(400).send({
                    message: "No record found."
                }).end();
            }else{
                res.json(trade);
            }
            
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving trades."
            });
        });
};

// Delete all trades
const deleteAllTrades = (req, res) => {

    Trade.remove()
    .then(trade => {
        res.send({message: "Trades deleted successfully!"}).status(200);
    }).catch(err => {
        return res.status(500).send({
            message: "Could not delete trades"
        });
    });

};

// Find a highest and lowest price of stock 
const findHigAndLowPrice = (req, res) => {

Trade.aggregate([
        { "$match": {
            createdAt : {
                            '$gte': new Date(req.query.start),
                            '$lte': new Date(req.query.end)
                        }
        }},
        {$group : {
            _id : "$symbol", 
            highest : {$max : "$price"}, 
            lowest : {$min : "$price"}
        }
        }])
        .then(trade => {
    
            if(trade.length==0){
                res.status(400).send({
                    message: "There are no trades in the given date range."
                }).end();
            }else{
                res.json(trade);
            }
            
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving trades."
            });
        });
};

module.exports = {
create,
findAll,
findByUserId,
deleteAllTrades,
findByStock,
findHigAndLowPrice
};