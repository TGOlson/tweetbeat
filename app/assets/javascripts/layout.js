var Layout = {
  init: function(){
    $('#toggle_synth').on('click', this.toggleSynth)
    $('#toggle_visual').on('click', this.toggleVisual)
    // $('.topic').draggable({ revert: "invalid" })
    // this.setDropArea()
    $( "#topics_list, #empty_synth_list" ).sortable({
      connectWith: ".connected"
    }).disableSelection();
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
        console.log(keyword)
        $(keyword).effect( "transfer", { to: this, className: "ui-effects-transfer" }, 300 )
        $(this).html(keyword.textContent)

        $(keyword).width( $(this).width() )
        keyword.offset({
          left: this.offsetLeft,
          top: this.offsetTop + ( $(this).width() * .6 )
        })

        $(keyword).css('background-color', 'grey')

        // var soundID = event.target.id
        // var keywordID = keyword[0].id
        // Stream.bindKeywordToSound(keywordID, soundID)
      }
    })
  },

  setPadSize: function(){
    var width = $('#synth_pads').find('li').width()
    $('#synth_pads').find('li').height(width)
  }
}