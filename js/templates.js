var stocksTemplate = "<table class='top-stocks'>\
    <thead>\
      <tr>\
        <th>\
          Symbol\
        </th>\
        <th>\
          Name\
        </th>\
        <th>\
          Last Price\
        </th>\
        <th>\
          Change\
        </th>\
        <th>\
          % Change\
        </th>\
        <th>\
          Volume\
        </th>\
        <th>\
          Market Cap\
        </th>\
      </tr>\
    </thead>\
    <tbody>\
      {{#each stocks }}\
        {{> stockListItem }}\
      {{/each}}\
    </tbody>\
  </table>\
";

var stockListItem = "<tr class='stock-list-item'>\
    <td>{{ticker}}</td>\
    <td>{{name}}</td>\
    <td>{{closePrice}}</td>\
    <td>{{stockChange change}}</td>\
    <td>{{stockChange percentChange}}</td>\
    <td>{{volumn}}</td>\
    <td>{{marketCap}}</td>\
  </tr>\
";

Handlebars.registerHelper('stockChange', function(value) {
  var className = "price-change";

  if (value === "na") {
    className += "";
  } else if (value < 0) {
    className += " negative";
  } else {
    className += " positive";
  }

  return new Handlebars.SafeString(
    "<span class='" + className +"'>" + value + "</span>"
  );
});

Handlebars.registerPartial("stockListItem", stockListItem);
