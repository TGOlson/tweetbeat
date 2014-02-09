var Stream = {
  myDataRef: null,

  init: function(){
    this.setDataRef()
    this.getStream()
    this.setEventHandlers()
  },

  setDataRef: function(){
    this.myDataRef = new Firebase('https://tweetbeatfb.firebaseio.com/tweets')
  },

  getStream: function(){
    $.get('/stream')
  },

  setEventHandlers: function(){
    this.myDataRef.on('child_added', function(childSnapshot) {
      var keyWordID = childSnapshot.val().keyword_id
      console.log(keyWordID)
      var e = $.Event(keyWordID.toString())
      $('body').trigger(e)
    })
  },

  bindKeywordToSound: function(keywordID, soundID) {
    Layout.landKeywordOnPad(soundID)
    var eventName = keywordID + '.sound' + soundID
    $('body').on(eventName, function(e) {
      playSample(soundID)
      Layout.flashColor(soundID)
    })
  },

  removeBoundKeywordFromSound: function(eventName) {
    $('body').off(eventName)
  }
}
