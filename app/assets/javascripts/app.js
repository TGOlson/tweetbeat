$(function() {
  App.init()
})

var App = {
  init: function() {
    Layout.init()
    initializeAudio()
    Scrolling.init()
    Topics.init()
    Stream.init()
    // Initializes the tweet stream.
    // Will only make a new stream
    // if one is not already running.
    $.get('/stream')
  }
}