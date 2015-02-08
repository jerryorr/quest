// TODO this may be better as a router. Doing this by hand for now to see how it plays out
var Scenes = require('./scenes')
  , Scene = require('./scene')
  , SceneView = require('./scene-view')
  , _ = require('underscore')

module.exports = function ($el) {
  this.$el = $el

  this.scene(1)
}

module.exports.prototype.scene = function (id) {
  if (this.view) {
    var oldView = this.view
      , self = this

    oldView.$el.on('transitionend', function () {
      oldView.remove()
      self.renderScene(id)
    })

    oldView.$el.removeClass('show')
  } else {
    this.renderScene(id)
  }
}

module.exports.prototype.renderScene = function (id) {
  var newView = this.view = new SceneView({ model: scenes.get(id) })

  this.$el.append(newView.render().el)
  process.nextTick(function () {
    newView.$el.addClass('show')
  })

  // TODO preload audio for each choice

  newView.once('choice', _.bind(this.scene, this))
}

// TODO load this stuff from a better format
var scenes = new Scenes([
  new Scene({
    id: 1,
    text: 'Suddenly, you see a trap door in the floor. You\'ve never noticed it before.',
    choices: [
      {
        sceneId: 2,
        description: 'Go find a grownup'
      },
      {
        sceneId: 3,
        description: 'Go down alone'
      }
    ]
  }),
  new Scene({
    id: 2,
    text: 'You go upstairs and see Uncle Chris.'
  }),
  new Scene({
    id: 3,
    text: 'You open the trap door and see stairs.'
  })
])

