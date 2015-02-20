// TODO this may be better as a router. Doing this by hand for now to see how it plays out
var Scenes = require('./scenes')
  , Scene = require('./scene')
  , SceneView = require('./scene-view')
  , _ = require('underscore')
  , quest = require('./quest.yaml')
  , $ = require('jquery')

console.log('quest: ', quest)

var Controller = module.exports = function ($el) {
  this.$el = $el

  this.scenes = new Scenes(quest.scenes)

  this.scene(1)
}

Controller.prototype.scene = function (id) {
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

Controller.prototype.renderScene = function (id) {
  var newScene = this.scenes.get(id)
  var newView = this.view = new SceneView({ model: newScene })

  this.$el.append(newView.render().el)

  // Needs to be nextTick so that element is in the dom hidden,
  // then can transition to 'show'
  process.nextTick(function () {
    newView.$el.addClass('show')
  })

  newView.once('choice', _.bind(this.scene, this))

  var self = this
  _.chain(newScene.get('choices'))
    .map(function (choice) { return choice.sceneId })
    .each(_.bind(this.preload, this))
}

Controller.prototype.preload = function (id) {
  // TODO I'm not sure this is really doing anything; a request is made,
  // but one is made again later when we try to load it for real.
  var source = $('<source/>').attr('src', 'audio/scene-' + id + '.m4a').attr('type', 'audio/x-m4a')
  $('<audio/>').attr('preload', 'auto').append(source)


  $('<img/>').attr('src', 'images/scene-' + id + '.png').css('display', 'none')
    .appendTo(this.$el)
}
