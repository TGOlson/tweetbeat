var context
var sampleLibrary = [ "audio/D.mp3", "audio/D_3rd.mp3", "audio/D_5th.mp3",
                      "audio/pew.mp3","audio/hat2.mp3","audio/fuck_you.mp3",
                      "audio/correctimundo.mp3","audio/whats_the_matter.mp3"]

var sampleBuffers = new Array ()
var masterGain

function playSample(index){
  var source = context.createBufferSource()
  source.buffer = sampleBuffers[index]
  source.connect(masterGain)
  source.noteOn
  source.start(0)
}

function loadSample(sampleURL, index){
  var request = new XMLHttpRequest()
  request.open("GET", sampleURL, true)
  request.responseType = "arraybuffer"

  request.onload = function(){
    context.decodeAudioData(request.response, function(buffer){
      sampleBuffers[index] = buffer
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
  masterGain.gain.value = 1
  masterGain.connect(context.destination)
  for (index=0; index<sampleLibrary.length; index++)
    loadSample(sampleLibrary[index],index)
}