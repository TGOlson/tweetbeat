$(function() {

  $.get('/topics', function(data) { Topics.init(data) }) // may prove unnecessary, see var Topics below
  soundGrid.init()
  // will want to initialize draggability of soundGrid (in init?), and droppability of appropriate keyword-representing table elements
})

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
//////////// begin testing ****************************************************************
    Stream.testBindKeywordToSound()
//////////// end testing ******************************************************************
  },
  // bindKeywordToSound: function(e) {
  //   e.preventDefault()
  //   // e.keywordID (string) will be the 'event' sent with an SSE of the appropriate keyword (or not -- for this and e.soundID, may have to grab using jQuery)
  //   // e.soundID (number) will be the id of the appropriate audio file or sound, whatever its form
  //   Stream.source.addEventListener(e.keywordID, function() {
  //     Audio.play(e.soundID)
  //   })
  // }
  testBindKeywordToSound: function() { // test only
    Stream.source.addEventListener('0', function() {
      Audio.play(0)
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

var soundGrid = {
  init: function() {
    // add listener for drops (triggers bindKeywordToSound via event delegation (uses e.target, see http://davidwalsh.name/event-delegate))
    // add listener for clicks (to play target child)
  },
  buttonFlash: function() {
    // causes a child button to flash (triggered on click or tweet)
  }
}


