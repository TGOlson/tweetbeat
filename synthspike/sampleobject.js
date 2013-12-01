  var context
  var sampleLoader
  var sampleLibrary = ["audio/daft.m4a", "audio/pew.mp3"]
  var sampleBuffers = new Array ()
  var sample = new Array()
  var masterGain 

  
  function finishedLoading(sampleBuffers){
    for (var i = 0; i < sampleBuffers.length; i++)
      sample[i] = new Sample(sampleBuffers[i])
  }
  
  function Sample(buffer){
    this.isPlaying = false
    this.buffer = buffer
  }
  
  Sample.prototype.play = function(){
    this.src = context.createBufferSource()
    this.src.buffer = this.buffer
    this.src.connect(masterGain)
    this.src.noteOn
    this.src.start(0)
  }

  Sample.prototype.off = function(){
    this.src.noteOff
    this.src.stop(0)
  }

  Sample.prototype.panic = function(){
    this.isPlaying ? this.off() : this.isPlaying
  }

  Sample.prototype.toggle = function(){
    this.isPlaying ? this.off() : this.play()
    this.isPlaying = !this.isPlaying
  }

  
  function loadSample(sampleURL, index){
    var request = new XMLHttpRequest()
    console.log(sampleURL)
    request.open("GET", sampleURL, true)
    request.responseType = "arraybuffer"

    request.onload = function(){
      context.decodeAudioData(request.response, function(buffer){
        sampleBuffers[index] = buffer
        if (++index == sampleLibrary.length)
          finishedLoading(sampleBuffers)
      }, onerror)
        
    }
    request.onerror = function(){
      alert("BufferLoader : XHR error")
    }
    request.send()
  }

  function initializeAudio(){
    window.AudioContext = window.AudioContext || window.webkitAudioContext
    context = new AudioContext()
    masterGain = context.createGain()
    masterGain.gain.value = 0
    masterGain.connect(context.destination)
    for (i=0; i<sampleLibrary.length; i++)
      loadSample(sampleLibrary[i],i)
  }



$(document).ready(function(){  
  
  initializeAudio()
  
  $("#orange").on("click", function(){
    var index = $(this).attr("data-id")
    sample[index].play()
  })


  $("#purple").on("click", function(){
    var index = $(this).attr("data-id")
    sample[index].toggle()
  })

  $("#volume").on("change", function(){
    masterGain.gain.value = this.value/10
    console.log(masterGain.gain.value)
  })

  $("#stop").on("click", function(){
    for (i = 0; i<sample.length; i++)
      sample[i].panic()
  })
})
