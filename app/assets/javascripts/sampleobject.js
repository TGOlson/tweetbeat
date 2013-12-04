var context
var sampleLibrary = [

["audio/D.mp3", "audio/D_3rd.mp3", "audio/D_5th.mp3",
"audio/pew.mp3","audio/hat2.mp3","audio/fuck_you.mp3",
"audio/correctimundo.mp3","audio/whats_the_matter.mp3"], 

["audio/Dminor_space_chord_root.mp3","audio/Dminor_space_chord_root+2.mp3","audio/Dminor_space_chord_root-2.mp3",
"audio/Dminor_space_bass.mp3","audio/Dminor_space_bass_+2-1.mp3","audio/Dminor_space_bass_-2.mp3",
"audio/Kick.mp3","audio/twinkle.mp3","audio/TwinkleDown.mp3"]

]
var sampleBuffers = new Array ()
var masterGain
var filter
var audioConstants
var currentLibrary


function playSample(index){
  var source = context.createBufferSource()
  source.buffer = sampleBuffers[currentLibrary][index]
  filter.on ? source.connect(filter):source.connect(masterGain)
  source.noteOn 
  source.start(0)
}

function changeVolume(volume){
  console.log(volume)
  masterGain.gain.value = (volume / 100) * (volume / 100)
  console.log(masterGain.gain.value)
}

function loadSample(sampleURL,lib,index){
  var request = new XMLHttpRequest()
  request.open("GET", sampleURL, true)
  request.responseType = "arraybuffer"

  request.onload = function(){
    context.decodeAudioData(request.response, function(buffer){
      sampleBuffers[lib][index] = buffer
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
    noctaves: Math.log(context.sampleRate / 15) / Math.LN2,
    qmult: 3/15
  }
}



function changeFrequency(x){
  var powerOfTwo = audioConstants.noctaves * (x/150 - 1)
  filter.frequency.value = Math.pow(2, powerOfTwo) * audioConstants.nyquist
  console.log(filter.frequency.value)
  console.log (audioConstants)
}

function changeQ(y){
  filter.Q.value = y * audioConstants.qmult
}

function toggleFilter(){
  filter.on ? filter.on = false : filter.on = true
}

function changeLibrary(lib){
  currentLibrary = lib
}

function initializeFilter(){
  filter = context.createBiquadFilter()
  filter.type = 0
  filter.frequency.value = 20000
  filter.on = false
}

function initializeGain(){
  masterGain = context.createGain()
  masterGain.gain.value = 1
}

function connectNodes(){
  filter.connect(masterGain)
  masterGain.connect(context.destination)
}

function bufferSamples(){
  for (lib=0; lib<sampleLibrary.length; lib++){
    sampleBuffers[lib] = new Array()
    for (index=0; index<sampleLibrary[lib].length; index++){
      loadSample(sampleLibrary[lib][index],lib, index)
    }  
  }
}

  function initializeAudio(){
    window.AudioContext = window.AudioContext || window.webkitAudioContext
    context = new AudioContext()
    currentLibrary = 0
    audioConstants = initializeConstants()
    initializeFilter()
    initializeGain()
    connectNodes()
    bufferSamples()
  }