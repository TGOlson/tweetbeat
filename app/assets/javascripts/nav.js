$(function(){
  $('#toggle_synth').on('click', function(){
    console.log('you synthin')
    $('nav').fadeIn()

  })

  $('#toggle_visual').on('click', function(){
    $('nav').fadeOut()
  })
})