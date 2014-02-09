var Stream = {
  source: null,

  init: function() {
    // Starts a new stream for each connected client
    Stream.source = new EventSource('/new_client')
  },

  bindKeywordToSound: function(keywordID, soundID) {
    Layout.landKeywordOnPad(soundID)
    var eventName = keywordID + '.sound' + soundID
    $(Stream.source).on(eventName, function(e) {
      playSample(soundID)
      Layout.flashColor(soundID)
      var object = JSON.parse(e.originalEvent.data)
      console.log(object.topic + ' - ' + object.text)
    })
  },

  removeBoundKeywordFromSound: function(eventName) {
    $(Stream.source).off(eventName)
  }
}


