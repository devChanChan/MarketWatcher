var stocksTemplate = Handlebars.compile(stocksTemplate);

$(document).ready(function(){
  $('.marquee').marquee();
  displayTopStocks();
});

function displayTopStocks() {
  var container = $("#top-stocks-container");

  getTopStocks()
    .then(function(topStocks) {
      var templateContext = {
        stocks: topStocks
      };

      var html = stocksTemplate(templateContext);

      container.html(html);
    });
}
