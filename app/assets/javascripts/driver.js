$(function() {

  $.get('/topics', function(data) { Topics.init(data) }) // may prove unnecessary, see var Topics
  Layout.init()
  // will want to initialize draggability of soundGrid (in init?), and droppability of appropriate keyword-representing table elements
})