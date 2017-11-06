//Bittrex methods to send, receive, and store data:

/*---Global Variables---*/

//currencies array returned from Bittrex API populated with currency objects
let currencies = [];
//array of currencies we are watching from currencies array above -
//format objects to look like this (both here and for ownedCurrenciesList below):
//{name: 'litecoin',
// ticker: 'ltc',
// marketPrice: .0085, Bittrex labels this 'last price'
// maxPrice: .0089,
// minPrice: .0082,
// volume: 800,
// bidPrice: .0084,
// askPrice: 0086,
// buyPrice: .0037, null at program start
// buyTime: '08-23-17-08:07:16GMT' empty string at program start}

let buyTime; /*the time and date at which the purchase was made*/
let buyPrice; /*the price at which the purchase was made*/

/*---METHODS---*/
let fetchCurrencyData = () => {
  /*this function is used to populate the currencies array.
  It fetches all altcoin currency data from bittrex API.
  The maxPrice and minPrice key value should be set equal to the marketPrice (last price)
  key value when this function runs and populates the currency array for the first time.
  After it is populated, maxPrice and minPrice are updated via maxPriceUpdater()
  and minPriceUpdater() methods each time updatePrices() method is called*/
}

//might be able to delete this function and just use fetchCurrencyData() method instead?
let dataGetter = (currency) => {
  /*take the currency arg (an object within the currency array),
  make an AJAX request to bittrex API for the current market
  price (last price), volume, bidPrice, and askPrice and return it*/
};

//function to buy a currency and Add it to ownedCurrenciesList
let buy = (currency) => {
  //write code to execute a buy order @ askPrice*spreadAccounter
  //add the currency to list of owned currencies
  ownedCurrenciesList.push(currency);
  //update buyTime and buyPrice
  currency['buyTime'] = /*Bittrex API should have a way to access this and store it here. If not, we will have to calculate it ourselves*/;
  currency['buyPrice'] = /*Bittrex API should have a way to access this and store it here. If not, we will have to calculate it ourselves*/;
};

//function to buy a currency and remove it from ownedCurrenciesList
let sell = (currency) => {
  //write code to execute a sell order @ bidPrice*liquidator
  remove(currency, ownedCurrenciesList);
};
