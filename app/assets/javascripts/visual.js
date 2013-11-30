function playVisuals(){


  var width = $(window).width()
  var height = $(window).height()

  var color = d3.scale.category20c()

  var i = 0

  var svg = d3.select("body").append("svg")
  .attr("width", width)
  .attr("height", height)

  svg.append("rect")
  .attr("width", width)
  .attr("height", height)
  .on("ontouchstart" in document ? "touchmove" : "mousemove", particle)

  function particle() {
    var m = d3.mouse(this)

    svg.insert("circle", "rect")
    .attr("cx", m[0])
    .attr("cy", m[1])
    .attr("r", 1e-6)
    .style("stroke", color(++i))
    .style("stroke-opacity", 1)
    .transition()
    .duration(2000)
    .ease(Math.sqrt)
    .attr("r", 100)
    .style("stroke-opacity", 1e-6)
    .remove()

    d3.event.preventDefault()
  }
}

function stopVisuals(){

}