var Stream = {
  source: null,
  init: function() {
    Stream.source = new EventSource('/stream')
  },
  bindKeywordToSound: function(keywordID, soundID) {
    console.log('bind called on keyword id', keywordID, ' and sound id', soundID)
    Layout.landKeywordOnPad(soundID)
    $(Stream.source).on(keywordID, function(e) {
      playSample(soundID)
      Layout.flashColor(soundID)
      tweetContent = JSON.parse(e.originalEvent.data)["content"]
      console.log(tweetContent)
    })
  },
  removeBoundKeywordFromSound: function(keywordID) {
    // if we're going to allow cloning, this will need to also accept soundID
    $(Stream.source).unbind(keywordID)
  }
}


