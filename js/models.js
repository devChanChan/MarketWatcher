var Stock = function (options) {
  this.ticker = options.ticker;
  this.name = options.name;
  this.closePrice = options.closePrice;
  this.change = options.change;
  this.percentChange = options.percentChange;
  this.volume = numeral(options.volume).format("0.00a");
  this.marketCap = numeral(options.marketCap).format("0.00a");
  this.priceHistory = options.priceHistory || [];
};

