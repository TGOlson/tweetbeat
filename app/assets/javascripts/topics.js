var Topics = {
  list: null,
  eachPageListingLength: 15,

  init: function() {
    $.get('/topics', function(data) {
    Topics.list = data
    })
  },

  rewriteListings: function(startIndex) {
    startIndex = parseInt(startIndex, 10)
    topicHolders = $('.deletable')
    topicsLeft = Topics.list.length - startIndex
    if (topicsLeft < Topics.eachPageListingLength) {
      var maxLoopLength = topicsLeft
    } else {
      var maxLoopLength = Topics.eachPageListingLength
    }
    for (var i = 0; i < Topics.eachPageListingLength; i++) {
      $(topicHolders[i]).html("")
      $(topicHolders[i]).addClass('hidden')
    }
    for (var i = 0; i < maxLoopLength; i++) {
      $(topicHolders[i]).removeClass('hidden')
      $(topicHolders[i]).append("<li class='topic' id=" + (startIndex + i) + ">" + Topics.list[startIndex + i] + "</li>")
    }
    $('.topic').draggable({ helper: "clone", revert: "invalid" })
  }
}
