(function() {

  var transform = function(data) {
    // Set up an object and an array to use
    var religion_data = { "Unknown": 0 };
    var religion_array = [];

    // For each legislator, increment the key associated with their religion
    for (var i = 0; i < data.length; i++) {
      var d = data[i];

      // Make sure they have a religion listed
      if (d.bio.religion) {

        // If the key already exists, increment it
        if (religion_data[d.bio.religion]) {
          religion_data[d.bio.religion]++;
        }

        // Otherwise, initialize a new key as 1
        else {
          religion_data[d.bio.religion] = 1;
        }
      }

      // If they don't have a religion in their bio, we'll increment "Unknown"
      else {
        religion_data["Unknown"]++;
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
  var barHeight = 25;
  var margin = 215;

  d3.json("/assets/data/legislators-current.json", function(data) {

    var filtered = transform(data.legislators).filter(function(d) {
      return d.name !== "Unknown";
    }).sort(function(a, b) {
      if (a.count < b.count) return 1;
      if (a.count > b.count) return -1;
      return 0;
    });

    var container = d3.select("div#d3religion_v0")
      .append("svg")
        .attr("width", width)
        .attr("height", barHeight * filtered.length);

    var x = d3.scale.linear()
      .domain([0, d3.max(filtered.map(function(d) { return d.count; }))])
      .range([0, width - margin]);

    // Add the arc segments to our visualization
    var bar = container.selectAll("g")
      .data(filtered)
      .enter()
      .append("g")
        .attr("transform", function(d, i) { return "translate(0, " + i * barHeight + ")"; });

    bar.append("rect")
      .attr("width", function(d) { return x(d.count); })
      .attr("height", barHeight - 1)
      .attr("transform", function(d, i) { return "translate(" + (width - margin - x(d.count)) + ", 0)"})
      .style("fill", "steelblue");

    bar.append("text")
      .attr("x", width - margin + 5)
      .attr("y", barHeight / 2)
      .attr("dy", ".35em")
      .style("font-size", "15px")
      .text(function(d) { return d.name; });

    bar.append("text")
      .attr("x", function(d) { return width - margin - x(d.count) + 5; })
      .attr("y", barHeight / 2)
      .attr("dy", ".35em")
      .style("font-size", "15px")
      .style("fill", "white")
      .text(function(d) { return d.count; });

  });
})();
