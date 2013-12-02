var Layout = {
  init: function(){
    $('#toggle_synth').on('click', this.toggleSynth)
    $('#toggle_visual').on('click', this.toggleVisual)
    $('.topic').draggable({ revert: "invalid" })
    this.setDropArea()
    this.setPadSize()
    $(window).resize(this.setPadSize)
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
        $(keyword).effect( "transfer", { to: this, className: "ui-effects-transfer" }, 500 )
        $(this).html(keyword.textContent)


        $(keyword).width( $(this).width() )
        keyword.offset({
          left: this.offsetLeft,
          top: this.offsetTop + ( $(this).width() * .6 )
        })

        // debugger
        // var soundID = event.target.id
        // var keywordID = event.toElement.id
        // Stream.bindKeywordToSound(keywordID, soundID)


      }
    })
  },

  setPadSize: function(){
    var width = $('#synth_pads').find('li').width()
    $('#synth_pads').find('li').height(width)
  }
}