var Backbone = require('backbone')
  , Scene = require('./scene')

module.exports = Backbone.Collection.extend({
  model: Scene
})
