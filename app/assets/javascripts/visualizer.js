var Visualizer = {

  color: d3.scale.category20c(),
  width: $(window).width() - 5,
  height: $(window).height() - 5,
  keywordObjects: [],

  start: function(){
    var svg = this.setSvgToBody()
    this.populate(svg)
  },

  setSvgToBody: function(width, height){
    var svg = d3.select("body").append("svg")
    .attr("width", Visualizer.width)
    .attr("height", Visualizer.height)
    return svg
  },

  populate: function(svg){
    $.each( $('.keyword_dropped'), function(i, e){
      console.log(e.id)
      var xloc = Math.random() * ( Visualizer.width - 100 )  + 50
      var yloc = Math.random() * ( Visualizer.height - 100 )  + 50
      Visualizer.keywordObjects.push( [e.id, xloc, yloc] )
      Visualizer.setEventToAppendSvg(svg, e.id)

      svg.insert('circle')
        .attr("cx", xloc)
        .attr("cy", yloc )
        .attr("r", 20)
        .style("stroke", Visualizer.color(Math.floor( Math.random()*20 + 1 )))
        .style("stroke-opacity", 1)
    })
  },

  setEventToAppendSvg: function(svg, keywordID){
    $(Stream.source).on(keywordID, function(){
      svg.append("rect")
      .attr("width", Visualizer.width)
      .attr("height", Visualizer.height)
       Visualizer.appendNewSvg(svg, keywordID)
    })
    // .on(keywordID, function(){ Visualizer.appendNewSvg(svg, keywordID) })
  },


  appendNewSvg: function(svg, keywordID){
      var xloc = 0
      var yloc = 0
      $.each(Visualizer.keywordObjects, function(i, e){
        if(e[0] === keywordID){
          xloc  = e[1]
          yloc  = e[2]
        }
      })
      svg.insert("circle", "rect")
      .attr("cx", xloc)
      .attr("cy", yloc)
      .attr("r", 1e-6)
      .style("stroke", Visualizer.color(Math.floor( Math.random()*20 + 1 )))
      .style("stroke-opacity", 1)
      .transition()
      .duration( Math.random() * 2000 + 1000 )
      .ease(Math.sqrt)
      .attr("r", Math.random() * 100 + 100 )
      .style("stroke-opacity", 1e-6)
      .remove()
  },

  stop: function(){
    $('svg').remove()
  }
}