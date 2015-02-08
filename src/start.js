var $ = require('jquery')
  , Backbone = require('backbone')
  , Controller = require('./controller')

// Bootstrap needs this, is there a better way?
window.jQuery = $
Backbone.$ = $

$(document).ready(function () {
  var controller = new Controller($('#content'))
})