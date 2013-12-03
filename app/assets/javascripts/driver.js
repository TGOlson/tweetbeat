$(function() {

  $.get('/topics', function(data) { Topics.init(data) }) // may prove unnecessary, see var Topics
  Stream.init()
  Layout.init()
  initializeAudio()
})