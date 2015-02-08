var $ = require('jquery')
  , Backbone = require('backbone')
  , Scenes = require('./scenes')
  , Scene = require('./scene')
  , SceneView = require('./scene-view')

// Bootstrap needs this, is there a better way?
window.jQuery = $
Backbone.$ = $

$(document).ready(function () {


  // TODO need to get this content from an easier place


  var scenes = new Scenes([
    new Scene({
      id: 1,
      text: 'Suddenly, you see a trap door in the floor. You\'ve never noticed it before.',
      choices: [
        {
          scene: 2,
          description: 'Go find a grownup'
        },
        {
          scene: 3,
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

  var first = new SceneView({
    model: scenes.get(1)
  })

  $('#content').append(first.render().el)
})