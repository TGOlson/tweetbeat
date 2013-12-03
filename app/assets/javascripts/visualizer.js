var Visualizer = {

  color: d3.scale.category20c(),
  width: $(window).width() - 5,
  height: $(window).height() - 5,

  start: function(){
    var svg = this.setSvgCanvas()
    this.populate(svg)
  },

  setSvgCanvas: function(width, height){
    var svg = d3.select("body").append("svg")
    .attr("width", Visualizer.width)
    .attr("height", Visualizer.height)

    svg.append("rect")
    .attr("width", Visualizer.width)
    .attr("height", Visualizer.height)

    return svg
  },

  populate: function(svg){
    $.each( $('.keyword_dropped'), function(i, e){
      var xloc = Math.random() * ( Visualizer.width - 100 )  + 50
      var yloc = Math.random() * ( Visualizer.height - 100 )  + 50

      svg.insert('circle')
      .attr('id', 'visual-' + e.id)
      .attr("cx", xloc)
      .attr("cy", yloc )
      .attr("r", 20)
      .style("stroke", Visualizer.color(Math.floor( Math.random()*20 + 1 )))
      .style("stroke-opacity", 1)

      Visualizer.setEventForVisuals(svg, e.id)
    })
  },

  setEventForVisuals: function(svg, keywordID){
    $(Stream.source).on(keywordID, function(){
     Visualizer.appendNewCircle(svg, keywordID)
   })
  },


  appendNewCircle: function(svg, keywordID){
    var keyword = $('#visual-' + keywordID)
    svg.insert("circle", "rect")
    .attr("cx", keyword.attr('cx'))
    .attr("cy", keyword.attr('cy'))
    .attr("r", 1e-6)
    .style("stroke", Visualizer.color(Math.floor( Math.random()*20 + 1 )))
    .style("stroke-opacity", .5)
    .transition()
    .duration( Math.random() * 2000 + 1000 )
    .ease(Math.sqrt)
    .attr("r", Math.random() * 1000 + 100 )
    .style("stroke-opacity", 1e-6)
    .remove()
  },

  stop: function(){
    $('svg').remove()
  }
}
