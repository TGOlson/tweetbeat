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
    console.log('bindKeywordToSound called on keywordID', keywordID, "and soundID", soundID)
    Stream.source.addEventListener(keywordID, function(e) {
      sample[soundID].play()
      tweetContent = JSON.parse(e.data)["content"] // mainly for debugging
      console.log(tweetContent) // mainly for debugging
    })
  }
}


