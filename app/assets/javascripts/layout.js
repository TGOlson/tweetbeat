var Layout ={

  bindings: { 81: 0, 87: 1, 69: 2,  // q, w, e
              65: 3, 83: 4, 68: 5,  // a, s, d
              90: 6, 88: 7, 67: 8}, // z, x, c

  init: function(){
    this.callHelperFunctions()
    this.applyEventListeners()
  },

  callHelperFunctions: function(){
    this.bindClicksToSounds()
    this.bindKeypressesToSounds()
    this.bindControlToDisplayToggle()
    this.setDropArea()
    this.setSliderStyle()
  },

  applyEventListeners: function(){
    $('.topic').draggable({ revert: "invalid" })
    $('#toggle_view').on('click', this.toggleView)
    $('.filter-toggle').on("click", this.filterToggleButton)
    $('#xy').on("mousemove", this.xyPadPostition)
  },

  bindClicksToSounds: function(){
    $('#synth_pads').on("click", 'li', function(e){
      Layout.invokeHitAction(e.target.id)
    })
  },

  bindKeypressesToSounds: function(){
    $(document).on("keydown", function(e){
      if (Layout.bindings[e.which] != undefined){
        Layout.invokeHitAction(Layout.bindings[e.which])
      }
    })
  },

  invokeHitAction: function(padNumber){
    playSample(padNumber)
    Layout.flashColor(padNumber)
  },

  bindControlToDisplayToggle: function(){
    $(document).bind("keydown keyup", function(e){
      if (e.which === 17){
        $('.ctrl_bound').toggleClass('hidden')
      }
    })
  },

  setDropArea: function(){
    $('#synth_pads li').droppable({
      hoverClass: "drop_hover",
      drop: function( event, ui ){
        Layout.unbindIfPadHasKeyword(this)
        Layout.playTransferEffect(ui.helper, this)
        Layout.placeKeyWordInPad(ui.helper, this)
        Stream.bindKeywordToSound(ui.helper.get(0).id, event.target.id)
      }
    })
  },

  unbindIfPadHasKeyword: function(target){
    var keywordID = $(target).contents('div').last().attr('id')
    if (keywordID != undefined){
      Stream.removeBoundKeywordFromSound(keywordID)
    }
  },

  playTransferEffect: function(keyword, target){
    $(keyword).effect( "transfer",{
      to: target,
      className: "ui-effects-transfer"
    }, 100 ).fadeOut(100)
  },

  placeKeyWordInPad: function(keyword, target){
        $(target).find('.drop_area')[0].id  = keyword.get(0).id
        $(target).find('.drop_area')
          .addClass('keyword_dropped')
          .html('<div class="dropped_keyword">' + keyword.text() + '</div>')
          .hide()
          .css('top', 40).css('left', 0)
          .fadeIn()
  },

  setSliderStyle: function(){
    $( "#slider-vertical" ).slider({
      orientation: "vertical",
      range: "min",
      min: 0,
      max: 100,
      value: 60,
      slide: function(event,ui){ Layout.setVolume(ui.value) }
    })
  },

  toggleView: function(){
    if($('body').hasClass('visual')){ Layout.showSynth() }
      else{ Layout.showVisual() }
    Layout.toggleSynthVisualClass()
  },

  showVisual: function(){
    $('#circle_toggle').animate({ left: '31px' }, 100)
    $('#toggle_icon').animate({ left: '5px' }, 100)
    Visualizer.start()
  },

  showSynth: function(){
    $('#circle_toggle').animate({ left: '0px' }, 100)
    $('#toggle_icon').animate({ left: '30px' }, 100)
    Visualizer.stop()
  },

  toggleSynthVisualClass: function(){
    $('#toggle_icon').find('i').toggle()
    $('body').toggleClass('visual')
    $('#toggle_view').toggleClass('synth_view')
  },

  landKeywordOnPad: function(soundID){
    var target = $('#synth_pads #' + soundID).find('.keyword_dropped')
    this.makeKeywordPadDraggable(target)
  },

  makeKeywordPadDraggable: function(target){
    $(target).draggable({ revert: "invalid" })
      .on('mousedown', function(e) {
        Stream.removeBoundKeywordFromSound($(e.originalEvent.target).closest('li').attr('id'))
        Layout.addTopicStyle(e)
    })
    .on('mouseup', Layout.removeTopicStyle)
  },

  addTopicStyle: function(e){
    $(e.target).addClass('topic')
  },

  removeTopicStyle: function(e){
    $(e.target).removeClass('topic')
  },


  flashColor: function(soundID) {
    var possibleTargets = $('#synth_pads #' + soundID)
    for (var i = 0; i < possibleTargets.length; i++) {
      if (possibleTargets[0].nodeName == 'LI') {
        var target = possibleTargets[0]
      }
    }
    $(target).addClass('pad_hit')
      setTimeout( function(){
        $(target).removeClass('pad_hit')
    }, 190)
  },

  xyPadPostition: function(e){
    var position = Layout.getCanvasPos(this, e)
    changeFrequency(position.x)
    changeQ(position.y)
  },

  getCanvasPos: function(canvas,move){
    var rect = canvas.getBoundingClientRect()
    return{
      x: move.clientX - rect.left,
      y: (move.clientY - rect.top) * (-1) + (150)
    }
  },

  filterToggleButton: function(){
    toggleFilter()
    $('.filter-toggle').toggleClass("filter-on")
  },

  setVolume: function(volume){
    changeVolume(volume)
  }
}





