describe('visualizer', function(){

  describe('visualizer properties', function(){
    it('should have a d3 color scale', function(){
      expect(Visualizer.color).toBeDefined()
      expect(Visualizer.color(1)).toEqual('#3182bd')
    })
    it('should define width and height of the canvas', function(){
      expect(Visualizer.width).toBeDefined()
      expect(Visualizer.height).toBeDefined()
    })
    it('should have an svg element that defaults to null', function(){
      expect(Visualizer.svg).toBeNull()
    })
  })

  describe('visualizer methods', function(){

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


  })
})
