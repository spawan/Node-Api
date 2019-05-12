const mongoose = require('mongoose');


const TradesSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    type: {
        type: String,
        enum : ['buy','sell'],
        default: 'buy'
    },
    user: 
    {
        id: Number,
        name:  String,
    }
    ,
    symbol:String,
    shares : {
    	type: Number,
    	min: 10,
    	max: 30
    },
    price : {
    	type: mongoose.Schema.Types.Decimal128,
    	min: 130.42,
    	max: 195.65
    }
    }, {
    timestamps: true
});

module.exports = mongoose.model('trades', TradesSchema);