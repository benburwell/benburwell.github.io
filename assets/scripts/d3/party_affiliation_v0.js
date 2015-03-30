(function() {

  var width = 900;
  var height = 700;
  var radius = Math.min(width, height) / 2;

  var transform = function(data) {
    return {
      "children": d3.shuffle(data.map(function(d0) {
        return {
          value: d0.terms.length,
          gender: d0.bio.gender,
          children: d0.terms.map(function(d1) {
            return {
              value: 1,
              party: d1.party
            }
          })
        };
      }).filter(function(d) {
        return Math.random() > 0.90;
      }))
    };
  };

  d3.json("/assets/data/legislators-current.json", function(data) {

    var partition = d3.layout.partition()
      .size([2 * Math.PI, radius * radius])
      .sort(null);

    var container = d3.select("div#d3party_affiliation_v0").append("svg")
        .attr("width", width)
        .attr("height", height)
      .append("g")
        .attr("transform", "translate(" + (width / 2) + "," + (height / 2) + ")");

    var arc = d3.svg.arc()
      .startAngle(function(d) { return d.x; })
      .endAngle(function(d) { return d.x + d.dx; })
      .innerRadius(function(d) { return Math.sqrt(d.y); })
      .outerRadius(function(d) { return Math.sqrt(d.y + d.dy); });

    container.datum(transform(data.legislators)).selectAll("path")
        .data(partition.nodes)
      .enter().append("path")
        .attr("display", function(d) { return d.depth ? null : "none"; })
        .attr("d", arc)
        .style("stroke", "#fff")
        .style("fill", function(d) {
          if (d.depth === 1) {
            return "lightslategray ";
          }
          if (d.depth === 2) {
            if (d.party === "Democrat") return "blue";
            if (d.party === "Republican") return "red";
            if (d.party === "Independent") return "purple";
          }
        })
        .style("fill-rule", "evenodd");
  });
})();
