var Backbone = require('backbone')
  , $ = require('jquery')

module.exports = Backbone.View.extend({
  render: function () {
    // TODO probably a template
    this.$el.append(this.model.get('text'))

    var audio = $('<audio/>')
      .attr('src', 'audio/scene-' + this.model.get('id') + '.m4a')
      .attr('preload', 'auto')

    this.$el.append(audio)

    process.nextTick(function () {
      audio.get(0).play()
    })

    return this
  }
})
