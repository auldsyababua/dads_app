/*---Global Variables---*/
//amount of btc invested in each currency - can be
//changed to add or diminish risk
const btcAmount = .05;

//20% target percent change on mediumCapWatchList items
const mediumTargetPercentChange = .2;
//20% stop loss set for all mediumCapOwnedCurrenciesList items
const mediumStopLoss = .15;
//20% target percent change on smallCapWatchList items
const smallTargetPercentChange = .3;
//20% stop loss set for all smallCapOwnedCurrenciesList items
const smallStopLoss = .2;

//this is multiplied by askPrice to ensure the buy occurs
const spreadAccounter = 1.15;
//this is multiplied by bidPrice to ensure the sell occurs
const liquidator = .85;

//array of medium cap currencies we now own
let mediumCapOwnedCurrenciesList = [];

//array of small cap currencies we now own
let smallCapOwnedCurrenciesList = [];

//keep our eye on these big cap cryptos - dont buy.
//coins valued at > .003btc
let bigCapWatchList = [];

//coins valued at <= .003 && >.0001
let mediumCapWatchList = [];

//coins valued at <= .0001btc
let smallCapWatchList = [];

//determine is default is ever fired
let blackHole = [];


/*---METHODS---*/

//separates each currency into it's proper watchList (above)
let currencyParser = (currenciesArray) => {
  currenciesArray.forEach(function(currency){
    switch(currency) {
      case currency['marketPrice'] > .003:
        bigCapWatchList.push(currency);
        break;
      case currency['marketPrice'] <= .003 && > .0001:
        mediumCapWatchList.push(currency);
        break;
      case currency['marketPrice'] <= .0001:
        smallCapWatchList.push(currency);
        break;
      default:
        blackHole.push(currency);
    }
  })
}

//updates the maxPrice key value on our currency object by referencing the
//latest marketPrice calculated in marketPriceGetter() within updatePrices();
let maxPriceUpdater = (currency) => {
  if (currency['marketPrice'] > currency['maxPrice']) {
    currency['maxPrice'] = currency['marketPrice']
  }
};

//updates the minPrice key value on our currency object by referencing the
//latest marketPrice calculated in marketPriceGetter() within updatePrices();
let minPriceUpdater = (currency) => {
  if (currency['marketPrice'] < currency['minPrice']) {
    currency['minPrice'] = currency['marketPrice']
  }
};

//function to update marketPrice, maxPrice, and minPrice
let updatePrices = (currenciesArray) => {
  //updates the value of the marketPrice key for each object in
  //the currencies array with the one returned by marketPriceUpdater
  //then uses that to update minPrice and maxPrice
  //syntax for setting marketPrice, volume, etc may not be correct
  currenciesArray.forEach(function(currency){
    maxPriceUpdater(currency);
    minPriceUpdater(currency);
  });
}

//function to call to remove a currency from one of the arrays
let remove = (currency, list) => {
  list.forEach(function(item) {
    if (item === currency) {
      list.splice(item, 1)
    }
  })
}

let runBuyCheck = (mediumCapWatchList, smallCapWatchList) => {
  mediumCapWatchList.forEach(function(currency){
    if ( currency['marketPrice'] > (currency['minPrice']*mediumTargetPercentChange)) {
      buy(currency);
      //add the currency to list of owned currencies
      mediumCapOwnedCurrenciesList.push(currency);
    }
  });
  smallCapWatchList.forEach(function(currency){
    if ( currency['marketPrice'] > (currency['minPrice']*smallTargetPercentChange)) {
      buy(currency);
      //add the currency to list of owned currencies
      smallCapOwnedCurrenciesList.push(currency);
    }
  });
};

//function to call to compare current market price with buy price
let runStopLoss = (mediumCapOwnedList, smallCapOwnedList) => {
  mediumCapWatchList.forEach(function(currency){
    if ( currency['marketPrice'] < (currency['maxPrice']*mediumStopLoss)) {
      sell(currency);
      //add the currency to list of owned currencies
      remove(currency, mediumCapOwnedList);
    }
  });
  smallCapWatchList.forEach(function(currency){
    if ( currency['marketPrice'] < (currency['maxPrice']*smallStopLoss)) {
      sell(currency);
      //add the currency to list of owned currencies
      remove(currency, smallCapOwnedList);
    }
  });
};

/*---Program Initialized---*/
setInterval(function(){
  currencies = fetchCurrencyData()
  //currencyParser method then sorts all of these currencies into their poper lists
  currencyParser(currencies);
  updatePrices(currencies)
  runBuyCheck(mediumCapOwnedCurrenciesList, smallCapOwnedCurrenciesList)
  runStopLoss(mediumCapOwnedCurrenciesList, smallCapOwnedCurrenciesList)
  }, 10000
);
