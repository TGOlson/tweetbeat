var Stream = {
  source: null,
  init: function() {
    Stream.source = new EventSource('/stream')
  },
  bindKeywordToSound: function(keywordID, soundID) {
    Layout.landKeywordOnPad(soundID)
    var eventName = keywordID + '.sound' + soundID
    $(Stream.source).on(eventName, function(e) {
      playSample(soundID)
      Layout.flashColor(soundID)
      tweetContent = JSON.parse(e.originalEvent.data)["content"]
      console.log(tweetContent)
    })
  },
  removeBoundKeywordFromSound: function(eventName) {
    $(Stream.source).off(eventName)
  }
}


