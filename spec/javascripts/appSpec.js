describe('app', function(){
  it('should initialize layout', function(){
    spyOn(Layout, 'init')
    App.init()
    expect( Layout.init ).toHaveBeenCalled()
  })
  it('should initialize scrolling', function(){
    spyOn(Scrolling, 'init')
    App.init()
    expect( Scrolling.init ).toHaveBeenCalled()
  })
  it('should initialize topics', function(){
    spyOn(Topics, 'init')
    App.init()
    expect( Topics.init ).toHaveBeenCalled()
  })
})
