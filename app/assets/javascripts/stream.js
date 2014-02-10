var Stream = {
  source: null,

  init: function() {
    // Starts a new stream for each connected client
    this.source = new EventSource('/new_client')
    this.setCloseAction()
  },

  bindKeywordToSound: function(keywordID, soundID) {
    Layout.landKeywordOnPad(soundID)
    var eventName = keywordID + '.sound' + soundID
    $(this.source).on(eventName, function(e) {
      playSample(soundID)
      Layout.flashColor(soundID)
      var object = JSON.parse(e.originalEvent.data)
      console.log(object.topic + ' - ' + object.text)
    })
  },

  removeBoundKeywordFromSound: function(eventName) {
    $(this.source).off(eventName)
  },

  setCloseAction: function(){
    window.onunload = function() {
      Stream.source.close()
      console.log('source closed')
    }
  }
}
