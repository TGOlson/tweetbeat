var Topics = {
  list: null,
  init: function() {
    $.get('/topics', function(data) {
    Topics.list = data
    console.log(data)
    })
  }
}
