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
  this.view && this.view.remove()

  this.view = new SceneView({ model: scenes.get(id) })

  this.$el.append(this.view.render().el)

  // TODO preload audio for each choice

  this.view.once('choice', _.bind(this.scene, this))
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

