var Visualizer = {

  color: d3.scale.category20c(),
  width: $(window).width() - 5,
  height: $(window).height() - 5,
  svg: null,

  start: function(){
    this.setSvgCanvas()
    this.populate()
    $('svg').on('click', 'circle', this.keywordClickEvent)
  },

  setSvgCanvas: function(width, height){
    Visualizer.svg = d3.select("body").append("svg")
    .attr("width", Visualizer.width)
    .attr("height", Visualizer.height)

    Visualizer.svg.append("rect")
    .attr("width", Visualizer.width)
    .attr("height", Visualizer.height)
  },

  populate: function(){
    $.each( $('.keyword_dropped'), function(i, e){

      var xloc = Math.random() * ( Visualizer.width - 100 )  + 50
      var yloc = Math.random() * ( Visualizer.height - 100 )  + 50
      var color = Visualizer.color( Visualizer.randNum(20, 1) )

      Visualizer.svg.insert('circle')
      .attr('id', 'visual-' + e.id)
      .attr("cx", xloc)
      .attr("cy", yloc )
      .attr("r", 20)
      .attr('keyword', $(e).find('div').text().split(' ')[0] )
      .style("stroke", 'none')
      .style("fill", color)
      .style("fill-opacity", .5)

      Visualizer.setEventForVisuals(e.id)
    })
  },

  setEventForVisuals: function(keywordID){
    $('body').on(keywordID, function(){
     Visualizer.appendNewCircle(keywordID)
   })
  },

  keywordClickEvent: function(e){
    var keywordID = $(e.target).attr('id')
    var keyword = $('#' + keywordID)
    Visualizer.svg.insert("text")
      .attr("x", keyword.attr('cx') - 30 )
      .attr("y", keyword.attr('cy'))
      .text( keyword.attr('keyword') )
      .style('fill', keyword.attr('style').split(' ')[3].slice(0, 7) )
      .style("stroke-opacity", .5)
      .transition()
      .duration( 700 )
      .ease(Math.sqrt)
      .attr("transform", "translate(" +
        Visualizer.randTransform() + "," +
        Visualizer.randTransform() + ")" )
      .style("fill-opacity", 1e-6)
      .remove()
  },

  appendNewCircle: function(keywordID){
    var keyword = $('#visual-' + keywordID)
    Visualizer.svg.insert("circle", "rect")
    .attr("cx", keyword.attr('cx'))
    .attr("cy", keyword.attr('cy'))
    .attr("r", 40)
    .style("stroke", Visualizer.color( Visualizer.randNum(20, 1) ))
    .style("stroke-opacity", .5)
    .style('fill', 'none')
    .transition()
    .duration( Visualizer.randNum(2000, 1000) )
    .ease(Math.sqrt)
    .attr("r", Visualizer.randNum(1000, 100) )
    .style("stroke-opacity", 1e-6)
    .remove()
  },

  randNum: function(mult, add){
    return Math.round( Math.random() * mult + add )
  },

  randTransform: function(){
    return Visualizer.randNum(2, -1) * Visualizer.randNum(100, 1)
  },

  stop: function(){
    $('svg').remove()
  }
}
