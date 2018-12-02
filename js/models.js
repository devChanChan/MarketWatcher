var Stock = function (options) {
  this.ticker = options.ticker;
  this.name = options.name;
  this.closePrice = options.closePrice;
  this.change = options.change;
  this.percentChange = options.percentChange;
  this.volume = options.volume;
  this.marketCap = options.marketCap;
  this.priceHistory = options.priceHistory || [];
};

