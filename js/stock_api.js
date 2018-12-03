var API_KEY = "OjU2NzNlZDRiNDdhNDcwMmJjNWRhNjE0ZTdkMzM2Nzgw";
var BASE_URL = "https://api.intrinio.com";
var TOP_STOCKS = [
  "AAPL",
  "GOOG",
  "AMZN",
  "ZG",
  "FB",
  "MSFT",
  "QCOM",
  "GM",
  "GE",
  "PG"
];

function ajax_options(options) {
  options = options || {};
  var defaults = {
    headers: {
      "Authorization": "Bearer " + API_KEY
    }
  };

  return $.extend({}, options, defaults);
}

function constructURL(url) {
  return BASE_URL + url;
}

function getTopStocks() {
  return getStockDataPoint(TOP_STOCKS.join(","));
}

function getStockDataPoint(stock) {
  var items = [
    "close_price",
    "change",
    "percent_change",
    "name",
    "volume",
    "marketcap"
  ];
  var options = {
    method: "GET",
    url: constructURL("/data_point"),
    data: {
      identifier: stock,
      item: items.join(",")
    }
  };

  var serializedOptions = ajax_options(options);

  return $.ajax(serializedOptions)
    .then(handleGetStockDataPointSuccess)
    .fail(function (error) {
      console.error(error);
    });
}

function searchStock(ticker) {
}

function getStockDetails(ticker) {
  return getStockDataPoint(ticker).then(function (stocks) {
    var stock = stocks[0];

    var options = {
      method: "GET",
      url: constructURL("/prices"),
      data: {
        identifier: ticker
      }
    };

    var serializedOptions = ajax_options(options);

    return $.ajax(serializedOptions)
      .then(function (response) {
        return handleGetPricesSuccess(response, stock);
      })
      .fail(function (error) {
        console.error(error);
      });
  });
}

function handleGetStockDataPointSuccess(response) {
  var stocks = response.data;
  var transformedData = [];
  var groupedData = groupTopStocksResponseData(stocks);
  var stockObjs = _.map(groupedData, function(value, key) {
    return new Stock({
      ticker: key,
      name: value.name,
      closePrice: value.close_price,
      change: value.change,
      percentChange: value.percent_change * 100,
      volume: value.volume,
      marketCap: value.marketcap
    });
  });
  var sortedStock = _.sortBy(stockObjs, ["ticker"]);

  return sortedStock;
}

function groupTopStocksResponseData(data) {
  var transformed = _.reduce(
    data,
    function (result, value) {
      var id = value.identifier;
      var currentData = result[id] || {};
      currentData[value.item] = value.value;
      result[id] = currentData;
      return result;
    },
    {}
  );
  return transformed;
}

function handleGetPricesSuccess(response, stock) {
  var prices = response.data;
  stock.priceHistory = prices;
  return stock;
}

