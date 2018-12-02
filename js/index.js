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
  // fetch every 5 seconds
  setInterval(displayTopStocks, 5000);
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
  });
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
