var FireHelper = {
  myDataRef: new Firebase('https://tweetbeatfb.firebaseio.com/tweets'),

  init: function(){
    this.setEventHandlers()
  },

  setEventHandlers: function(){
    this.myDataRef.on('child_added', function(childSnapshot) {
      console.log(childSnapshot.val())
    })
  }
}

$(function(){
  FireHelper.init()
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
})