(function() {
  d3.json("/assets/data/legislators-current.json", function(data) {

  d3.select("div#d3gender_terms_v0").selectAll("svg")
    .data(data.legislators)
    .enter()
    .append("svg")
      .attr("width", function(d) { return d.terms.length * 2; })
      .attr("height", function(d) { return d.terms.length * 2; })
    .append("circle")
      .attr("cx", function(d) { return d.terms.length; })
      .attr("cy", function(d) { return d.terms.length; })
      .attr("r", function(d) { return d.terms.length; })
      .style("fill", function(d) { return d.bio.gender === 'F'? "green" : "blue"; });
  });
})();
