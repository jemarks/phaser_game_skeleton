var Splash = require('../models/splash');
var Splash = function () {

};


module.exports = Splash;

Splash.prototype = {
  create: function () {
    this.asset = this.add.sprite(160, 60, 'logo');
    this.asset.scale.x = 0.5;
    this.asset.scale.y = 0.5;
    this.asset.alpha = 0;
    this.faded_in = false;
  },
  update: function () {
    if (this.asset.alpha <1 && !this.faded_in) {
      this.asset.alpha+=0.01;
    } else if(this.asset.alpha >= 1) {
      this.faded_in = true;
    }
    if(this.faded_in) {
      this.asset.alpha -= 0.01;
    }
    if (this.asset.alpha < 0) {
      this.game.state.start('Menu');
    }
  }
};
