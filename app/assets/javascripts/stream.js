// var Stream = {
//   source: null,

//   init: function() {
//     Stream.source = new EventSource('/stream')
//   },

//   removeBoundKeywordFromSound: function(eventName) {
//     $(Stream.source).off(eventName)
//   }
// }

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
    console.log(eventName)
    $('body').on(eventName, function(e) {
      playSample(soundID)
      Layout.flashColor(soundID)
      console.log(e)
    })
  }
}


      // var myDataRef = new Firebase('https://tweetbeatfb.firebaseio.com/tweets');
      // // $('#messageInput').keypress(function (e) {
      // //   if (e.keyCode == 13) {
      // //     var name = $('#nameInput').val();
      // //     var text = $('#messageInput').val();
      // //     myDataRef.push({name: name, text: text});
      // //     $('#messageInput').val('');
      // //   }

      // // function displayChatMessage(name, text) {
      // //   $('<div/>').text(text).prepend($('<em/>').text(name+': ')).appendTo($('#messagesDiv'));
      // //   $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
      // // }
