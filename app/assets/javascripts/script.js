$(function() {

  // var sample

  function sample(audiofile) {
    var sample = document.createElement('audio')
    // sample.setAttribute('src', 'app/assets/audio/' + audiofile + '.mp3')
    sample.setAttribute('src', '/' + audiofile + '.mp3')
    sample.setAttribute('autoplay','autoplay')
  }

  // sample('fuck_you')
  console.log('attempted to make noise')

  $('#start-stream').on('click', function(){
    var source = new EventSource('/stream')
    source.addEventListener('tweet', function(e) {
      sample('fuck_you')
      console.log('hit')
    })
  })

})