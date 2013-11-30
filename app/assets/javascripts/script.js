$(function() {

  $('#start-stream').on('click', function(){
    var source = new EventSource('/stream')
    source.addEventListener('tweet', function(e) {
      console.log(e)
    })
  })

})