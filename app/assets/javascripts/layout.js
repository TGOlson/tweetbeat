var Layout = {
  init: function(){
    $('#toggle_synth').on('click', this.toggleSynth)
    $('#toggle_visual').on('click', this.toggleVisual)
    $('.topic').draggable({ revert: "invalid" })
    this.setDropArea()
    this.setSliderStyle()
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

        $(this).find('div').html('<div class="dropped_keyword">' + keyword.text() + '</div>')
        $(this).find('.drop_area').addClass('keyword_dropped').hide().fadeIn()

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

  landKeywordOnPad: function(soundID){
    var target = $('#synth_pads #' + soundID).find('.keyword_dropped')
    this.makeKeywordPadDraggable(target)
  },

  makeKeywordPadDraggable: function(target){
    $(target).draggable({ revert: "invalid" }).on('mousedown', function(){
      $(this).addClass('topic')
    }).on('mouseup', function(){
      $(this).removeClass('topic')
    })
  },

  flashColor: function(soundID) {
    $('#synth_pads #' + soundID).animate({
      color: '#e74c3c'
    }, 200, function() {
      $('#synth_pads #' + soundID).animate({
        color: '#999'
      }, 200)
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





