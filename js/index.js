/*---Global Variables---*/
//amount of btc invested in each currency - can be
//changed to add or diminish risk
const btcAmount = .05;
//40% target percent change
const targetPercentChange = .4;
//this is multiplied by askPrice to ensure the buy occurs
const spreadAccounter = 1.05;
//this is multiplied by bidPrice to ensure the sell occurs
const liquidator = .95;

//array of currencies we now own
let ownedCurrenciesList = [];

//keep our eye on these - dont buy.
let watchListOne = [];

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
    currency['marketPrice'] = dataGetter(currency).marketPrice;
    currency['volume'] = dataGetter(currency).volume;
    currency['bidPrice'] = dataGetter(currency).bidPrice;
    currency['askPrice'] = dataGetter(currency).askPrice;
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

let runBuyCheck = (currencies) => {
  currencies.forEach(function(currency){
    if ( currency['marketPrice'] > (currency['minPrice']*targetPercentChange)) {
      buy(currency);
    }
  });
};

//function to call to compare current market price with buy price
let runStopLoss = (ownedCurrenciesList) => {
  ownedCurrenciesList.forEach(function(currency){
    if (currency['marketPrice'] < (currency['maxPrice']*.75)) {
      sell(currency);
    }
  };
};

/*---Program Initialized---*/
currencies = fetchCurrencyData();

//call the updatePrices function every 10 seconds to update
//Market price, minPrice, and maxPrice
setInterval(function(){
  updatePrices(currencies)}, 10000)
};

//call the runStopLoss function every 10 seconds to determine if
//a trade needs to be made
setInterval(function(){
  runStopLoss(ownedCurrenciesList)}, 10000)
};

//Code fired to decide when to buy a currency.
setInterval(function(){
  runBuyCheck(currencies)}, 10000)
};
