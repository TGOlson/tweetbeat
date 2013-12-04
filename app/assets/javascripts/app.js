$(function() {
  App.init()
})

var App = {
  init: function() {
    Layout.init()
    initializeAudio() // comment out for app tests -- should stub
    Scrolling.init()
    Topics.init()
    Stream.init()
  }
}