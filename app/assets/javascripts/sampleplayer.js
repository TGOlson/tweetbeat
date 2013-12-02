  var sampleLibrary = [ "audio/D.mp3", "audio/D_3rd.mp3", "audio/D_5th.mp3",
                        "audio/pew.mp3","audio/hat2.mp3","audio/fuck_you.mp3",
                        "audio/correctimundo.mp3","audio/whats_the_matter.mp3"]
  var context
  var masterGain


  function playSample(index){
    console.log("in play sample")
    var audio = new Audio()
    audio.src = sampleLibrary[index]
    audio.output = context.createMediaElementSource(audio)
    audio.output.connect(masterGain)
    audio.play()
  }


  function initializeAudio(){
    window.AudioContext = window.AudioContext || window.webkitAudioContext
    context = new AudioContext()
    masterGain = context.createGain()
    masterGain.gain.value = 0.2
    masterGain.connect(context.destination)
  }