var stocksTemplate = Handlebars.compile(stocksTemplate);

$(document).ready(function(){


  $("#myForm").submit(function(){
    var orderPositions = $(this).serializeArray();
    alert(orderPositions.toSource());  // debug

    orderPositions.forEach(function(position){
      localStorage.setItem(position.name, position.value);
    });

    alert(localStorage.getItem("company"));
    alert(localStorage.getItem("price"));
  });


  // // canvas responsive
  // resize();
  // $(window).on("resize", function(){
  //     resize();
  // });

  // function resize(){
  //     $("#canvas").outerHeight($(window).height()-$("#canvas").offset().top- Math.abs($("#canvas").outerHeight(true) - $("#canvas").outerHeight()));
  // }
  $('.marquee').marquee();

  displayTopStocks();
});

$(document).on("pagebeforeshow","#stock-details", stockDetailsInit);

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

function stockDetailsInit() {
  var stockTicker = getUrlParams("ticker");

  getStockDetails(stockTicker).then(function (stock) {
    console.log(stock);
    drawPriceChart(stock);
  });
}

function drawPriceChart(stock) {
  var canvas = document.getElementById("stock-chart").getContext('2d');
  var dateLabels = _.map(stock.priceHistory, function (item) {
    return item.date;
  });
  var priceData = _.map(stock.priceHistory, function (item) {
    return item.close;
  });

  var chartData = {
    labels: dateLabels,
    datasets: [
      {
        fillColor: "rgba(255, 255, 255, 0)",
        strokeColor: "#ff792e",
        pointColor: "#194964",
        data: priceData
      }
    ]
  };

  var chart = new Chart(canvas).Line(chartData);
}

function getUrlParams(prop) {
  var params = {};
  var search = decodeURIComponent( window.location.href.slice( window.location.href.indexOf( '?' ) + 1 ) );
  var definitions = search.split( '&' );

  definitions.forEach( function( val, key ) {
    var parts = val.split( '=', 2 );
    params[ parts[ 0 ] ] = parts[ 1 ];
  } );

  return ( prop && prop in params ) ? params[ prop ] : params;
}
