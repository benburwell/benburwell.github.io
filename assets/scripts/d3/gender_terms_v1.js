(function() {
  var width = 960;
  var height = 500;
  var color = d3.scale.category10();

  var pack = d3.layout.pack()
    .sort(function(a, b) {
      if (a.value > b.value) { return -1; }
      if (a.value < b.value) { return 1; }
      return 0;
    })
    .size([width, height])
    .padding(4);

  var container = d3.select("div#d3gender_terms_v1")
    .append("svg")
      .attr("width", width)
      .attr("height", height);

  d3.json("/assets/data/legislators-current.json", function(data) {

    container.selectAll("circle")
      .data(pack({
        children: data.legislators.map(function(x) {
          return {
            value: x.terms.length,
            gender: x.bio.gender
          }
        }
      )}))
      .enter()
      .append("circle")
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; })
        .attr("r", function(d) { return d.depth === 1? d.r : 0; })
        .style("fill", function(d) { return color(d.gender); });
  });
})();
