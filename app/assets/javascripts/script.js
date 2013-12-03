var Topics = { // may not need this at all; as long as we get topic id as 'event' tag from SSE and get same id from the draggable table elements, no need
  list: null,
  init: function(data) {
    Topics.list = data
  }
}

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


