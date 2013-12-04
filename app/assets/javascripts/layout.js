var Layout = {

  bindings: {'q': 0, 'w': 1, 'e': 2,
             'a': 3, 's': 4, 'd': 5,
             'z': 6, 'x': 7, 'c': 8},

  init: function(){
    this.applyEventHandlers()
    this.callHelperFunctions()
  },

  applyEventHandlers: function(){
    $('#toggle_view').on('click', this.toggleView)
    $('.topic').draggable({ revert: "invalid" })
    $('#xy').on("mousemove", this.xyPadPostition)
    $('.filter-toggle').on("click", this.filterToggleButton)
  },

  callHelperFunctions: function(){
    this.bindClicksToSounds()
    this.bindKeypressesToSounds()
    this.bindControlToDisplayToggle()
    this.setDropArea()
    this.setSliderStyle()
  },

  getCanvasPos: function(canvas,move){
    var rect = canvas.getBoundingClientRect()
    return{
      x: move.clientX - rect.left,
      y: (move.clientY - rect.top) * (-1) + (150)
    }
  },

  bindClicksToSounds: function() {
    $('#synth_pads').on("click", 'li', function(e) {
        Layout.invokeHitAction(e.target.id)
    })
  },

  invokeHitAction: function(element){
    playSample(element)
    Layout.flashColor(element)
  },

  bindKeypressesToSounds: function() {
    $(document).on("keydown", function(e) {
      enteredChar = String.fromCharCode(e.keyCode).toLowerCase()
      boundSoundID = Layout.bindings[enteredChar]
      if (boundSoundID >= 0 || boundSoundID <= 8) {
        Layout.invokeHitAction(boundSoundID)
      }
    })
  },

  bindControlToDisplayToggle: function() {
    $(document).bind("keydown keyup", function(e) {
      if ( (e.ctrlKey) || (e.keyCode == 17) ) {
        $('.ctrl_bound').toggleClass('hidden')
      }
    })
  },

  toggleView: function(){
    $('#toggle_icon').find('i').toggle()
    $('.synth').toggle()
    $('body').toggleClass('visual')

    if( $('#toggle_view').hasClass('synth_view') ) {
      Layout.showVisual()
    } else { Layout.showSynth() }

    $('#toggle_view').toggleClass('synth_view')
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

  setDropArea: function(){
    $('#synth_pads li').droppable({
      hoverClass: "drop_hover",
      drop: function( event, ui ) {

        var keywordID = $(this).contents('div').last().attr('id')
        if (keywordID >= 0) {
          Stream.removeBoundKeywordFromSound(keywordID)
        }
        var keyword = ui.helper

        $(keyword).effect( "transfer", { to: this, className: "ui-effects-transfer" }, 100 ).fadeOut(100)
        $(this).find('.drop_area').html('<div class="dropped_keyword">' + keyword.text() + '</div>')
          .addClass('keyword_dropped').hide().fadeIn()
          .css('top', 40).css('left', 0)

        $(this).find('.drop_area')[0].id  = keyword[0].id
        var soundID = event.target.id
        var keywordID = keyword[0].id
        Stream.bindKeywordToSound(keywordID, soundID)
      }
    })
  },


  landKeywordOnPad: function(soundID){
    var target = $('#synth_pads #' + soundID).find('.keyword_dropped')
    this.makeKeywordPadDraggable(target)
  },

  makeKeywordPadDraggable: function(target){
    $(target).draggable({ revert: "invalid" })
      .on('mousedown', function(e) {
        Stream.removeBoundKeywordFromSound(e.target.id)
        Layout.addTopicStyle(e)
      })
      .on('mouseup', Layout.removeTopicStyle)
  },

  addTopicStyle: function(e){
    console.log('added topic style')
    $(e.target).addClass('topic')
  },

  removeTopicStyle: function(e){
    console.log('removed topic style')
    $(e.target).removeClass('topic')
  },

  flashColor: function(soundID) {
    $('#synth_pads #' + soundID).animate({
      color: '#e74c3c',
      borderBottomColor: '#777',
      backgroundColor: '#ddd'
    }, 10, function() {
      setTimeout(function() {
        $('#synth_pads #' + soundID).animate({
          color: '#ddd',
          borderBottomColor: '#95a5a6',
          backgroundColor: '#eee'
        }, 10)
      }, 190)
    })
  },

  xyPadPostition: function(e){
      var position = Layout.getCanvasPos(this, e)
      changeFrequency(position.x)
      changeQ(position.y)
  },

  filterToggleButton: function(){
    toggleFilter()
    $('.filter-toggle').toggleClass("filter-on")
  },

  setSliderStyle: function(){
    $( "#slider-vertical" ).slider({
      orientation: "vertical",
      range: "min",
      min: 0,
      max: 100,
      value: 60
    })
    $('#slider-vertical').slider({
      change: function(event,ui) {
        Layout.setVolume(ui.value) }
    })
  },

  setVolume: function(volume){
    changeVolume(volume)
  }
}





