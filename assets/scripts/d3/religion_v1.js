(function() {

  var transform = function(data) {
    // Set up an object and an array to use
    var religion_data = { "Known": 0, "Unknown": 0 };
    var religion_array = [];

    // For each legislator, increment the key associated with their religion
    for (var i = 0; i < data.length; i++) {
      var d = data[i];

      if (!d.bio.religion || d.bio.religion === "Unknown") {
        religion_data["Unknown"]++;
      } else {
        religion_data["Known"]++;
      }
    }

    // Now convert our object to an array for use in the pie chart
    for (var e in religion_data) {
      religion_array.push({
        name: e,
        count: religion_data[e]
      });
    }

    return religion_array;
  };

  var width = 900;
  var height = 400;
  var radius = Math.min(width, height) / 2;

  var pie = d3.layout.pie()
    .value(function(d) { return d.count; })
    .sort(null);

  var container = d3.select("div#d3religion_v1")
    .append("svg")
      .attr("width", width)
      .attr("height", height);

  var donut = container.append("g")
    .attr("transform", "translate(" + (width / 2) + "," + (height / 2) + ")");

  var arc = d3.svg.arc()
    .outerRadius(radius)
    .innerRadius(radius / 2);

  d3.json("/assets/data/legislators-current.json", function(data) {

    // Add the arc segments to our visualization
    donut.selectAll("path")
      .data(pie(transform(data.legislators)))
      .enter()
      .append("path")
        .attr("d", arc)
        .attr("fill", function(d) { return d.data.name === "Unknown" ? "#ddd" : "steelblue"; });
    });
})();
