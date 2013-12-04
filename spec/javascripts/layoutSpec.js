describe('Layout', function(){
  describe('init', function(){
    it('should bind clicks to sounds', function(){
      spyOn(Layout, 'bindClicksToSounds')
      Layout.init()
      expect(Layout.bindClicksToSounds).toHaveBeenCalled()
    })
    it('should bind key presses to sounds', function(){
      spyOn(Layout, 'bindKeypressesToSounds')
      Layout.init()
      expect(Layout.bindKeypressesToSounds).toHaveBeenCalled()
    })
    it('should bind controller to display toggle', function(){
      spyOn(Layout, 'bindControlToDisplayToggle')
      Layout.init()
      expect(Layout.bindControlToDisplayToggle).toHaveBeenCalled()
    })
    it('should set drop area', function(){
      spyOn(Layout, 'setDropArea')
      Layout.init()
      expect(Layout.setDropArea).toHaveBeenCalled()
    })
    it('should set slider style', function(){
      spyOn(Layout, 'setSliderStyle')
      Layout.init()
      expect(Layout.setSliderStyle).toHaveBeenCalled()
    })
  })
})

