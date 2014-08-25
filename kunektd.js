var terminalActive = false;
var relicActive = false;

window.onload = function (e) {
  var navrunes = document.getElementsByClassName('navrune');
  for (var x = 0; x < navrunes.length; x++) {
    navrunes[x].addEventListener('click', handleNav);
  }

  restartGame();
};

var gotoHavonti = function () {
  window.api.goto('havonti');
  console.log('navigating to havonti');
  skolu.paused = true;
  kalisha.paused = true;
  entos.paused = true;

  havonti.paused = false;
};

var gotoEnding1 = function () {
  window.api.goto('ending1');
  skolu.paused = true;
  kalisha.paused = true;
  entos.paused = true;
  havonti.paused = true;
};

var gotoEnding2 = function () {
  window.api.goto('ending2');
  skolu.paused = true;
  kalisha.paused = true;
  entos.paused = true;
  havonti.paused = true;
};

var handleNav = function (e) {
  console.log('handling nav');

  var target = e.target.dataset['id'];
  window.api.goto(target);

  if (target === 'title001') {
    restartGame();
  }

  if (target === 'skolu') {
    console.log('navigating to skolu');
    kalisha.paused = true;
    entos.paused = true;
    havonti.paused = true;

    skolu.paused = false;
  }

  if (target === 'kalisha') {
    console.log('navigating to kalisha');
    skolu.paused = true;
    entos.paused = true;
    havonti.paused = true;

    kalisha.paused = false;
  }

  if (target === 'entos') {
    console.log('navigating to entos');
    skolu.paused = true;
    kalisha.paused = true;
    havonti.paused = true;

    entos.paused = false;
  }
};

function trunc(x) {
  return x < 0 ? Math.ceil(x) : Math.floor(x);
}

var restartGame = function() {
  console.log('restarting game!');

  kalisha.state.start('kalishaMain');
  skolu.state.start('skoluMain');
  entos.state.start('entosMain');
  havonti.state.start('havontiMain');

  skolu.paused = true;
  entos.paused = true;
  havonti.paused = true;
  kalisha.paused = false;

  // hide dem links
  document.getElementById('kalishaskolulink').setAttribute('hidden', '');
  document.getElementById('kalishaentoslink').setAttribute('hidden', '');

  window.api.goto('title001');
};

// `api.init()` - initializes the presentation,
// `api.next()` - moves to next step of the presentation,
// `api.prev()` - moves to previous step of the presentation,
// `api.goto( idx | id | element, [duration] )` - moves the presentation
//  to the step given by its index number id or the DOM element; 
//  second parameter can be used to define duration of the transition in ms,
//  but it's optional - if not provided default transition duration
//  for the presentation will be used.

var notifications = document.getElementsByClassName('notification');

var setNotifications = function (msg) {
  if (notifications[0].innerHTML !== msg) {
    for (var x = 0; x < notifications.length; x++) {
      notifications[x].innerHTML = msg;
    }
  }
};


//game.paused = true;

// Set the alive property of the player to false
//this.player.alive = false;

// Prevent new pipes from appearing
//this.game.time.events.remove(this.timer);

// Go through all the pipes, and stop their movement
//this.pipes.forEachAlive(function(p){
//p.body.velocity.x = 0;
//}, this);

// var hole = Math.floor(Math.random()*5)+1;
// for (var i = 0; i < 8; i++)
//   if (i != hole && i != hole +1)
//     this.addOnePipe(400, i*60+10);
// if (!this.score) this.score = 0;
// this.score += 1;
// this.labelScore.text = this.score;

// addOnePipe: function(x, y) {
//   // var pipe = this.pipes.getFirstDead();

//   // pipe.reset(x, y);
//   // pipe.body.velocity.x = -200;
//   // pipe.checkWorldBounds = true;
//   // pipe.outOfBoundsKill = true;
// },


//jump: function() {
// Jump animation
//game.add.tween(this.player).to({angle: -20}, 100).start();

// Play sound
//this.jumpSound.play();
//},

// Slowly rotate the player downward, up to a certain point.
//if (this.player.angle < 20)
//this.player.angle += 1;

//if (this.player.inWorld == false)
//this.restartGame();


//this.timer = this.game.time.events.loop(1500, this.addRowOfPipes, this);

// var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
// spaceKey.onDown.add(this.jump, this);

//this.labelScore = this.game.add.text(20, 20, "", { font: "30px Arial", fill: "#ffffff" });