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
