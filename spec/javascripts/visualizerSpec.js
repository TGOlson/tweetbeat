describe('visualizer', function(){

  describe('properties', function(){
    it('should have a d3 color scale', function(){
      expect(Visualizer.color).toBeDefined()
      expect(Visualizer.color(1)).toEqual('#3182bd')
    })
    it('should define width and height of the canvas', function(){
      expect(Visualizer.width).toBeDefined()
      expect(Visualizer.height).toBeDefined()
    })
    it('should have an svg element that defaults to null', function(){
      expect(Visualizer.svg).toBeDefined()
      expect(Visualizer.svg).toBeNull()
    })
  })

  describe('methods', function(){

    describe('start', function(){
      it('should set the svg canvas', function(){
        spyOn(Visualizer, 'setSvgCanvas')
        Visualizer.start()
        expect(Visualizer.setSvgCanvas).toHaveBeenCalled()
      })
      it('should populate svg canvas', function(){
        spyOn(Visualizer, 'populate')
        Visualizer.start()
        expect(Visualizer.populate).toHaveBeenCalled()
      })
    })

    describe('stop', function(){
      it('should remove all svg elements', function(){
        spyOn( $.fn, 'remove' )
        Visualizer.stop()
        expect( $.fn.remove ).toHaveBeenCalled()
      })
    })
  })
})
