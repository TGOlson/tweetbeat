var Layout = {
  init: function(){
    $('#toggle_view').on('click', this.toggleView)
    $('.topic').draggable({ revert: "invalid" })
    this.bindClicksToSounds()
    this.bindKeypressesToSounds()
    this.bindControlToDisplayToggle()
    this.setDropArea()
    this.setSliderStyle()
  },

  bindClicksToSounds: function() {
    $('#synth_pads').on("click", function(e) {
      if (e.target && e.target.nodeName == "LI") {
        playSample(e.target.id)
        Layout.flashColor(e.target.id)
      } else if (e.target && e.target.nodeName == "DIV") {
        var classes = e.target.className.split(" ")
        for (var i = 0; i < classes.length; i++) {
          if (classes[i] == "drop_area" || classes[i] == "ctrl_bound") {
            liElement = $(e.target).closest('li')[0]
            playSample(liElement.id)
            Layout.flashColor(liElement.id)
          }
        }
      }
    })
  },

  bindKeypressesToSounds: function() {
    var bindings = {'q': 0, 'w': 1, 'e': 2, 'a': 3, 's': 4, 'd': 5, 'z': 6, 'x':7, 'c': 8}
    $(document).on("keydown", function(e) {
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
        $('.ctrl_bound').removeClass('hidden')
      }
    })
    $(document).on("keyup", function(e) {
      if (e.keyCode == 17) {
        $('.ctrl_bound').addClass('hidden')
      }
    })
  },

  toggleView: function(){
    $('#toggle_icon').find('i').toggle()
    $('.synth').toggle()
    $('body').toggleClass('visual')

    if( $('#toggle_view').hasClass('synth_view') ) {
      Layout.showVisual()
    } else { Layout.showSynth() }

    $('#toggle_view').toggleClass('synth_view')
  },

  showVisual: function(){
    $('#circle_toggle').animate({ left: '25px' }, 100)
    $('#toggle_icon').animate({ left: '5px' }, 100)
    Visualizer.start()
  },

  showSynth: function(){
    $('#circle_toggle').animate({ left: '0px' }, 100)
    $('#toggle_icon').animate({ left: '24px' }, 100)
    Visualizer.stop()
  },

  setDropArea: function(){
    $('#synth_pads li').droppable({
      hoverClass: "drop_hover",
      drop: function( event, ui ) {
        var keyword = ui.helper
        $(keyword).effect( "transfer", { to: this, className: "ui-effects-transfer" }, 100 ).fadeOut(100)
        // debugger
        $(this).find('.drop_area').html('<div class="dropped_keyword">' + keyword.text() + '</div>')
          .addClass('keyword_dropped').hide().fadeIn()
          .css('top', 60).css('left', 0)

        $(this).find('.drop_area')[0].id  = keyword[0].id
        var soundID = event.target.id
        var keywordID = keyword[0].id
        Stream.bindKeywordToSound(keywordID, soundID)
      }
    })
  },


  landKeywordOnPad: function(soundID){
    var target = $('#synth_pads #' + soundID).find('.keyword_dropped')
    this.makeKeywordPadDraggable(target)
  },

  makeKeywordPadDraggable: function(target){
    $(target).draggable({ revert: "invalid" })
      .on('mousedown', Layout.addTopicStyle)
      .on('mouseup', Layout.removeTopicStyle)
  },

  // toggle introduces bugs, need both add and remove
  addTopicStyle: function(e){
    $(e.target).addClass('topic')
  },

  removeTopicStyle: function(e){
    $(e.target).removeClass('topic')
  },

  removeDroppedKeyword: function(target){
    target.removeClass('keyword_dropped')
    // $(Stream.source).unbind(e.target.id)
  },

  flashColor: function(soundID) {
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


  setSliderStyle: function(){
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
  },

  setVolume: function(volume){
    changeVolume(volume)
  }
}





