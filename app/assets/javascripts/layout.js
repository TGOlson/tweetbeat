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
        $(this).find('.drop_area').css('top', 60)
        $(this).find('.drop_area').css('left', 0)
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
    $(target).draggable({ revert: "invalid" }).on('mousedown', Layout.toggleTopicStyle)
  },

  toggleTopicStyle: function(e){
    console.log(e.target)
    $(e.target).addClass('topic')
  },

  removeDroppedKeyword: function(target){
    target.removeClass('keyword_dropped')
    // $(Stream.source).unbind(e.target.id)
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





