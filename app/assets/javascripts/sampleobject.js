var context
var sampleLibrary = [ "audio/D.mp3", "audio/D_3rd.mp3", "audio/D_5th.mp3",
                      "audio/pew.mp3","audio/hat2.mp3","audio/fuck_you.mp3",
                      "audio/correctimundo.mp3","audio/whats_the_matter.mp3"]
var sampleBuffers = new Array ()
var masterGain
var filter
var constants


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

function initializeConstants(){
  return {
    nyquist: context.sampleRate * 0.5,
    noctaves: Math.log(context.sampleRate / 20) / Math.LN2,
    qmult: 3/20
  }
}



function changeFrequency(x){
  var powerOfTwo = constants.noctaves * (x/200 - 1)
  filter.frequency.value = Math.pow(2, powerOfTwo) * constants.nyquist
}

function changeQ(y){
  filter.Q.value = y * constants.qmult
}

function toggleFilter(){
  filter.on ? filter.on = false : filter.on = true
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
  constants = initializeConstants()
  for (index=0; index<sampleLibrary.length; index++)
    loadSample(sampleLibrary[index],index)
}