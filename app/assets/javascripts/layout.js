$(function(){

  $('#toggle_synth').on('click', function(){
    $('nav').show()
    $('body').css('background-color', '#fff')
    stopVisuals()
  })

  $('#toggle_visual').on('click', function(){
    $('nav').hide()
    $('body').css('background-color', '#222')
    playVisuals()
  })

  $('.topic').draggable()
})