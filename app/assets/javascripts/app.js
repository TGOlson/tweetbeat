$(function() {
  App.init()
})

var App = {
  init: function() {
    Layout.init()
    initializeAudio()
    Scrolling.init()
    Topics.init()
    // Stream.init()
  }
}