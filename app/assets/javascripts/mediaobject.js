  var context
  var sampleLoader
  var sampleLibrary = [ "audio/pew.mp3","audio/hat2.mp3","audio/fuck_you.mp3","audio/correctimundo.mp3","audio/whats_the_matter.mp3" ]
  var sampleHTML = new Array ()
  var sample = new Array()
  var masterGain


  function finishedLoading(sampleHTML){
    for (var i = 0; i < sampleHTML.length; i++)
      sample[i] = new Sample(sampleHTML[i])
  }

  function Sample(audioTag){
    this.isPlaying = false
    this.audioTag = audioTag
    this.src = context.createMediaElementSource(this.audioTag)
    this.src.connect(masterGain)
  }

  Sample.prototype.play = function(){
    this.audioTag.play()
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
    sampleHTML[index] = new Audio()
    sampleHTML[index].src = sampleURL
    // sampleHTML[index].controls = true
    document.body.appendChild(sampleHTML[index])
  }


  function initializeAudio(){
    window.AudioContext = window.AudioContext || window.webkitAudioContext
    context = new AudioContext()
    masterGain = context.createGain()
    masterGain.gain.value = 1
    masterGain.connect(context.destination)
    // for (i=0; i<sampleLibrary.length; i++)
    //   loadSample(sampleLibrary[i],i)
    for (i=0; i<sampleLibrary.length; i++)
      mediaSample(sampleLibrary[i],i)
    finishedLoading(sampleHTML)
  }



$(document).ready(function(){

  initializeAudio()

})