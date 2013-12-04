$(function() {

  App.init()

})

var App = {
  init: function() {
    Topics.init()
    // Stream.init()
    Layout.init()
    initializeAudio()
    Scrolling.init()
  }
}