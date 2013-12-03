var Visualizer = {

  color: d3.scale.category20c(),
  width: $(window).width() - 5,
  height: $(window).height() - 5,

  start: function(){
    var svg = this.setSvgToBody()

    svg.append("rect")
    .attr("width", Visualizer.width)
    .attr("height", Visualizer.height)
    .on("click", function(){ Visualizer.appendNewSvg(svg) })
  },

  setSvgToBody: function(width, height){

    var svg = d3.select("body").append("svg")
    .attr("width", Visualizer.width)
    .attr("height", Visualizer.height)
    return svg
  },

  setEventHandlerToAppend: function(){

  },

  populate: function(){
    $.each( $('.keyword_dropped'), function(i, e){
      console.log(e)
    })
  },

  appendNewSvg: function(svg){
      svg.insert("circle", "rect")
      .attr("cx", 100)
      .attr("cy", 200)
      .attr("r", 1e-6)
      .style("stroke", Visualizer.color(Math.floor( Math.random()*20 + 1 )))
      .style("stroke-opacity", 1)
      .transition()
      .duration(2000)
      .ease(Math.sqrt)
      .attr("r", 100)
      .style("stroke-opacity", 1e-6)
      .remove()

      d3.event.preventDefault()
  },

  stop: function(){
    $('svg').remove()
  }
}