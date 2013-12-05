describe('Layout', function(){
  it('should have a bindings property', function(){
    expect(Layout.bindings).toBeDefined()
    expect(Layout.bindings[81]).toEqual(0)
  })

  describe('init', function(){
    describe('calls helper functions', function(){
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

    describe('calls apply event listeners', function(){
      it('should make topics draggable', function(){
        spyOn($.fn, 'draggable')
        Layout.init()
        expect($.fn.draggable).toHaveBeenCalled()
      })
      it('should set two onclick listener with callback', function(){
        spyOn($.fn, 'on')
        Layout.init()
        expect( $.fn.on ).toHaveBeenCalledWith('click', Layout.toggleView)
        expect( $.fn.on ).toHaveBeenCalledWith('click', Layout.filterToggleButton)
      })
      it('should set the xy position when mouse moved on xy pad', function(){
        spyOn($.fn, 'on')
        Layout.init()
        expect( $.fn.on ).toHaveBeenCalledWith('mousemove', Layout.xyPadPostition)
      })
    })

    describe('clicks bound to sounds', function(){
      it('should invoke a hit action on click', function(){
        spyOn($.fn, 'on')
        Layout.init()
        expect($.fn.on).toHaveBeenCalledWith('click', 'li', jasmine.any(Function))
      })
    })

    describe('how many times "on" is called', function(){
      it ('should be called 5 times', function(){
        spyOn($.fn, 'on')
        Layout.init()
        expect($.fn.on.calls.count()).toEqual(6)
      })
    })

    describe('setDropArea', function(){
      it('should set the drop area', function(){
        spyOn($.fn, 'droppable')
        Layout.setDropArea()
        expect($.fn.droppable).toHaveBeenCalled()
      })
    })

    describe('setSliderStyle', function(){
      it ('should test that a slider is present', function(){
        spyOn($.fn, 'slider')
        Layout.setSliderStyle()
        expect($.fn.slider).toHaveBeenCalledWith(jasmine.any(Object))
      })
    })
  })
})

