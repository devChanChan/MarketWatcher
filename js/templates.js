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
    <td><a href='stock_details.html?ticker={{ticker}}'>{{ticker}}</a></td>\
    <td>{{name}}</td>\
    <td>{{formatNumber closePrice}}</td>\
    <td class='{{stockChange change}}'>{{formatNumber change format='0,0.00'}}</td>\
    <td class='{{stockChange percentChange}}'>{{formatNumber percentChange format='0,0.00'}}</td>\
    <td>{{formatNumber volume format='0.00a'}}</td>\
    <td>{{formatNumber marketCap format='0.00a'}}</td>\
  </tr>\
";

// helper registrations
Handlebars.registerHelper('stockChange', function(value) {
  var className = "price-change";

  if (value === "na") {
    className += "";
  } else if (value < 0) {
    className += " negative";
  } else {
    className += " positive";
  }

  return className;
});

Handlebars.registerHelper('formatNumber', function(value, options) {
  var format = options.hash.format;

  if (format) {
    return numeral(value).format(format);
  }

  return value;
});

// partials registrations
Handlebars.registerPartial("stockListItem", stockListItem);
