$(function() {

  $('#start-stream').on('click', function(){
  setTimeout(function() {
    var source = new EventSource('/stream')
    source.addEventListener('tweet', function(e) {
      // console.log('refresh noticed')
      console.log(e)
    })
  }, 1)
  })
})