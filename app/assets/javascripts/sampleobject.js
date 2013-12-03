var context
var sampleLibrary = [ "audio/D.mp3", "audio/D_3rd.mp3", "audio/D_5th.mp3",
                      "audio/pew.mp3","audio/hat2.mp3","audio/fuck_you.mp3",
                      "audio/correctimundo.mp3","audio/whats_the_matter.mp3"]

var sampleBuffers = new Array ()
var masterGain
var filter
var Qmult = 30

function playSample(index){
  var source = context.createBufferSource()
  source.buffer = sampleBuffers[index]
  filter.on ? source.connect(filter):source.connect(masterGain)
  source.noteOn
  source.start(0)
}

function changeVolume(volume){
  console.log(volume)
  masterGain.gain.value = (volume / 100) * (volume / 100)
  console.log(masterGain.gain.value)
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

function changeFrequency(x){
  xx = (x/2)/100
  var value = xx;
  var nyquist = context.sampleRate * 0.5;
  var noctaves = Math.log(nyquist / 10.0) / Math.LN2;
  var v2 = Math.pow(2.0, noctaves * (value - 1.0));
  var cutoff = v2*nyquist;
  filter.frequency.value = cutoff
}

function changeQ(y){
  yy = (y/2)/100
  filter.Q.value = yy * Qmult
  console.log(filter.Q.value)
}

function toggleFilter(){
  filter.on ? filter.on = false : filter.on = true
  console.log(filter.on)

}

function initializeAudio(){
  window.AudioContext = window.AudioContext || window.webkitAudioContext
  context = new AudioContext()
  filter = context.createBiquadFilter()
  filter.type = 0
  filter.frequency.value = 20000
  filter.on = false
  masterGain = context.createGain()
  masterGain.gain.value = 1
  filter.connect(masterGain)
  masterGain.connect(context.destination)
  for (index=0; index<sampleLibrary.length; index++)
    loadSample(sampleLibrary[index],index)
}