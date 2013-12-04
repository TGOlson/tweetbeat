
describe('visualizer', function(){
  describe('start', function(){
    it('should set the svg canvas', function(){
      spyOn(Visualizer, 'setSvgCanvas')
      Visualizer.start()
      expect(Visualizer.setSvgCanvas).toHaveBeenCalled()
    })
  })
})
