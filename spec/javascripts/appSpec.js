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
  it('should initialize stream', function(){
    spyOn(Stream, 'init')
    App.init()
    expect( Stream.init ).toHaveBeenCalled()
  })


})

    // spyOn(Scrolling, 'init')
    // spyOn(Topics, 'init')
    // spyOn(Stream, 'init')
    // expect( Scrolling.init ).toHaveBeenCalled()
    // expect( Topics.init ).toHaveBeenCalled()
    // expect( Stream.init ).toHaveBeenCalled()
// describe('init', function(){
//   it('should initialize event listeners', function(){
//     spyOn(Layout, 'setDropArea')
//       // spyOn($.fn, "click")
//       Layout.init()
//       expect( Layout.setDropArea ).toHaveBeenCalled()
//       // expect( $.fn.click ).toHaveBeenCalled()
//     })
// })