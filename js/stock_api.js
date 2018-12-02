var API_KEY = "OmRkZGYyODcwNTc2MDQwMjI5N2FkNGRiMGJjYzc5MDc4";
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
      identifier: TOP_STOCKS.join(","),
      item: items.join(",")
    }
  };

  var serializedOptions = ajax_options(options);
  return $.ajax(serializedOptions)
    .then(handleGetTopStocksSuccess)
    .fail(function (error) {
      console.error(error);
    });
}

function searchStock(ticker) {
}

function handleGetTopStocksSuccess(response) {
  var stocks = response.data;
  var transformedData = [];
  var groupedData = groupTopStocksResponseData(stocks);
  var stockObjs = _.map(groupedData, function(value, key) {
    return new Stock({
      ticker: key,
      name: value.name,
      closePrice: value.close_price,
      change: value.change,
      percentChange: value.percent_change,
      volume: value.volume,
      marketCap: value.marketcap
    });
  });
  var sortedStock = _.sortBy(stockObjs, ["ticker"]);

  console.log(sortedStock);
  return sortedStock;
}

function groupTopStocksResponseData(data) {
  var groupedByTicker = _.groupBy(data, "identifier");
  var transformed = _.transform(
    groupedByTicker,
    function(result, value, key) {
      var transformedValue = _.reduce(value, function(itemResult, itemVal) {
        itemResult[itemVal.item] = itemVal.value;
        return itemResult;
      }, {});

      result[key] = transformedValue;
      return result;
    },
    {}
  );
  return transformed;
}

