  var context
  var sampleLoader
  var sampleLibrary = [ "audio/pew.mp3","audio/daft.m4a"]
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
    this.src = context.createMediaElementSource(this.buffer)
    this.src.connect(masterGain)
  }
  
  Sample.prototype.play = function(){
    this.buffer.play()
  }

  Sample.prototype.off = function(){
    
    this.src.stop(0)
  }

  Sample.prototype.panic = function(){
    this.isPlaying ? this.off() : this.isPlaying
  }

  Sample.prototype.toggle = function(){
    this.isPlaying ? this.off() : this.play()
    this.isPlaying = !this.isPlaying
  }

  function mediaSample(sampleURL, index){
    sampleBuffers[index] = new Audio()
    sampleBuffers[index].src = sampleURL
    // sampleBuffers[index].controls = true
    document.body.appendChild(sampleBuffers[index])
  }


  function initializeAudio(){
    window.AudioContext = window.AudioContext || window.webkitAudioContext
    context = new AudioContext()
    masterGain = context.createGain()
    masterGain.gain.value = 0
    masterGain.connect(context.destination)
    // for (i=0; i<sampleLibrary.length; i++)
    //   loadSample(sampleLibrary[i],i)
    for (i=0; i<sampleLibrary.length; i++)
      mediaSample(sampleLibrary[i],i)
    finishedLoading(sampleBuffers)
  }



$(document).ready(function(){  
  
  initializeAudio()
  
  $("#orange").on("click", function(){
    var index = $(this).attr("data-id")
    sample[index].play()
  })


  $("#purple").on("click", function(){
    var index = $(this).attr("data-id")
    sample[index].play()
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
