var Scrolling = {
  firstTopicIndex: 0,
  init: function() {
    $('#up-button').on("click", function() {
      Scrolling.firstTopicIndex -= Topics.eachPageListingLength
      if (Scrolling.firstTopicIndex >= 0) {
        Topics.rewriteListings(Scrolling.firstTopicIndex)
      } else {
        Scrolling.firstTopicIndex += Topics.eachPageListingLength
      }
    })
    $('#down-button').on("click", function() {
      Scrolling.firstTopicIndex += Topics.eachPageListingLength
      if (Scrolling.firstTopicIndex <= Topics.list.length - 1) {
        Topics.rewriteListings(Scrolling.firstTopicIndex)
      } else {
        Scrolling.firstTopicIndex -= Topics.eachPageListingLength
      }
    })
  }
}