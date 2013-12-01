$(function(){

  $('#toggle_synth').on('click', function(){
    $('.synth').show()
    $('body').css('background-color', '#fff')
    stopVisuals()
  })

  $('#toggle_visual').on('click', function(){
    $('.synth').hide()
    $('body').css('background-color', '#222')
    playVisuals()
  })

  // $('#topics_list').sortable()
  $('.topic').draggable({ revert: "invalid" })
  $('.synth_canvas').droppable({
    hoverClass: "drop_hover",
    drop: function( event, ui ) {
      $(event.toElement).fadeOut()
    }
  })
})