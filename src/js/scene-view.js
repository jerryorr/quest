var Backbone = require('backbone')
  , $ = require('jquery')
  , template = require('./scene-view.hbs')
  , _ = require('underscore')
module.exports = Backbone.View.extend({
  className: "scene text-center",
  events: {
    'click .choices button': 'choice'
  },

  render: function () {
    var data = this.model.toJSON()
    data.text = _.map(data.text.split('\n\n'), function (p) {
      return '<p>' + p + '</p>'
    }).join('')
    this.$el.append(template(data))

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
