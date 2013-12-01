var Topics = { // may not need this at all; as long as we get topic id as 'event' tag from SSE and get same id from the draggable table elements, no need
  list: null,
  init: function(data) {
    Topics.list = data
    Stream.init()
  }
}

var Stream = {
  source: null,
  init: function() {
    $('#start-stream').on('click', Stream.open)
  },
  open: function() {
    Stream.source = new EventSource('/stream')
  },
  bindKeywordToSound: function(keywordID, soundID) {
    console.log('bindKeywordToSound called on keywordID', keywordID, "and soundID", soundID)
    Stream.source.addEventListener(keywordID, function(e) {
      Audio.play(soundID)
      tweetContent = JSON.parse(e.data)["content"] // mainly for debugging
      console.log(tweetContent) // mainly for debugging
    })
  }
}

var Audio = {
  list: ['fuck_you', 'correctimundo', 'whats_the_matter'],
  play: function(soundID) { // important: assuming that soundID maps directly to Audio.list indices
    var sample = document.createElement('audio')
    sample.setAttribute('src', '/' + Audio.list[soundID] + '.mp3')
    sample.setAttribute('autoplay','autoplay')
  }
  // may add init, which calls a create function on each item in list and/or initializes a synth object
}


