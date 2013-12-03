 $(function() {
    $( "#slider-vertical" ).slider({
      orientation: "vertical",
      range: "min",
      min: 0,
      max: 100,
      value: 60,
    })
    $('#slider-vertical').slider({
      change: function(event,ui) {
        Layout.setVolume(ui.value) }
    })
  });



var Layout = {
  init: function(){
    $('#toggle_synth').on('click', this.toggleSynth)
    $('#toggle_visual').on('click', this.toggleVisual)
    $('.topic').draggable({ revert: "invalid" })
    this.bindClicksToSounds()
    this.bindKeypressesToSounds()
    this.bindControlToDisplayToggle()
    this.setDropArea()
  },

  bindClicksToSounds: function() {
    $('#synth_pads').on("click", function(e) {
      if (e.target && e.target.nodeName == "LI") {
        playSample(e.target.id)
        Layout.flashColor(e.target.id)
      } else if (e.target && e.target.nodeName == "DIV") {
        var classes = e.target.className.split(" ")
        for (var i = 0; i < classes.length; i++) {
          if (classes[i] == "drop_area") {
            liElement = $(e.target).closest('li')[0]
            playSample(liElement.id)
            Layout.flashColor(liElement.id)
          }
        }
      }
      // later, integrate in flash of color too, and add to that animation
    })
  },

  bindKeypressesToSounds: function() {
    var bindings = {'q': 0, 'w': 1, 'e': 2, 'a': 3, 's': 4, 'd': 5, 'z': 6, 'x':7, 'c': 8}
    $(document).on("keypress", function(e) {
      enteredChar = String.fromCharCode(e.keyCode).toLowerCase()
      boundSoundID = bindings[enteredChar]
      if (boundSoundID >= 0 || boundSoundID <= 8) {
        playSample(boundSoundID)
        Layout.flashColor(boundSoundID)
      }
    })
  },

  bindControlToDisplayToggle: function() {
    $(document).on("keydown", function(e) {
      if (e.ctrlKey) {
        console.log('control')
      }
    })
  },

  toggleSynth: function(){
    $('.synth').show()
    $('body').css('background-color', '#fff')
    Visualizer.stop()
  },

  toggleVisual: function(){
    $('.synth').hide()
    $('body').css('background-color', '#222')
    Visualizer.start()
  },

  setDropArea: function(){
    $('#synth_pads li').droppable({
      hoverClass: "drop_hover",
      drop: function( event, ui ) {

        var keyword = ui.helper
        $(keyword).effect( "transfer", { to: this, className: "ui-effects-transfer" }, 100 ).fadeOut(100)

        $(this).find('div').html(keyword.text())
        $(this).find('div').addClass('keyword_dropped').hide().fadeIn()

        var soundID = event.target.id
        var keywordID = keyword[0].id
        Stream.bindKeywordToSound(keywordID, soundID)
      }
    })
  },

  // removeDroppedKeyword: function(e){
  //   $(e.target).closest('div').text(".").removeClass('keyword_dropped')
  //   $(Stream.source).unbind(e.target.id)
  // },

  flashColor: function(soundID) {
    // $('#synth_pads #' + soundID).animate({
    //   color: '#e74c3c'
    // }, 200, function() {
    //   $('#synth_pads #' + soundID).animate({
    //     color: '#999'
    //   }, 200)
    // })
    $('#synth_pads #' + soundID).animate({
      color: '#e74c3c',
      borderBottomColor: '#bbb',
      borderTopColor: '#999',
      backgroundColor: '#ccc'
    }, 10, function() {
      setTimeout(function() {
        $('#synth_pads #' + soundID).animate({
          color: '#999',
          borderBottomColor: '#999',
          borderTopColor: '#bbb',
          backgroundColor: '#ddd'
        }, 10)
      }, 190)
    })
  },

  setVolume: function(volume){
    changeVolume(volume)
  }
}






