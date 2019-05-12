const tradeController = require('../controllers/tradeController');

module.exports = function(app){

    app.get('/trades', tradeController.findAll);

    app.delete('/erase', tradeController.deleteAllTrades);

    app.post('/trades', tradeController.create);

    app.get('/trades/users/:userId', tradeController.findByUserId);

    app.get('/stocks/:symbol/trades', tradeController.findByStock);

    app.get('/stocks/:symbol/price', tradeController.findHigAndLowPrice);
   
}