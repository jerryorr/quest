var Backbone = require('backbone')
  , $ = require('jquery')
  , template = require('./scene-view.hbs')

module.exports = Backbone.View.extend({
  events: {
    'click .choices button': 'choice'
  },

  render: function () {
    this.$el.append(template(this.model.toJSON()))

    var self = this
    process.nextTick(function () {
      self.$el.find('audio').get(0).play()
    })

    return this
  },

  choice: function (e) {
    this.trigger('choice', $(e.target).data('sceneId'))
  }
})
