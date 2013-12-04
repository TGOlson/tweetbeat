var Stream = {
  source: null,
  init: function() {
    Stream.source = new EventSource('/stream')
  },
  bindKeywordToSound: function(keywordID, soundID) {
    Layout.landKeywordOnPad(soundID)
    $(Stream.source).on(keywordID, function(e) {
      playSample(soundID)
      Layout.flashColor(soundID)
      tweetContent = JSON.parse(e.originalEvent.data)["content"] // mainly for debugging
      console.log(tweetContent) // mainly for debugging
    })
  },
  removeBoundKeywordFromSound: function(keywordID) {
    $(Stream.source).unbind(keywordID)
  }
}


