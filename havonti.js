var havonti = new Phaser.Game(400, 400, Phaser.CANVAS, 'havontidiv');

var havontiMainState = {

  currentRoom: this['the choice'],

  'the choice':
  '000000000000000000' +
  '0◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼0' +
  '0◼◼◼◼◼◼◼◼◼⧖◼◼◼◼◼◼0' +
  '0◼◼◼◼◼◼◼◼◼0◼◼◼◼◼◼0' +
  '0◼◼◼◼◼◼◼◼◼00◼◼◼◼◼0' +
  '0◼◼◼◼◼◼◼◼◼00◼◼◼◼◼0' +
  '0◼◼◼◼◼◼◼◼0⧗◼◼◼◼◼◼0' +
  '0◼◼◼◼◼◼◼000◼◼◼◼◼◼0' +
  '0◼◼◼◼◼◼00000◼◼◼◼◼0' +
  '0◼◼◼◼◼◼00000◼◼◼◼◼0' +
  '0◼◼◼◼◼◼0000◼◼◼◼◼◼0' +
  '0◼◼◼◼◼0⨎00◼◼◼◼◼◼◼0' +
  '0◼◼◼◼◼00◼◼◼◼◼◼◼◼◼0' +
  '0◼◼◼◼◼00◼◼◼◼◼◼◼◼◼0' +
  '0◼◼◼◼◼◼0◼◼◼◼◼◼◼◼◼0' +
  '0◼◼◼◼◼◼⨍◼◼◼◼◼◼◼◼◼0' +
  '0◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼◼0' +
  '000000000000000000'
  ,

  GRIDWIDTH: 25,
  GRIDHEIGHT: 25,

  player: {
    MAXSPEEDX: 200,
    MAXSPEEDY: 200,
    MAXACCELX: 1000,
    MAXACCELY: 1000
  },

  preload: function() {
    havonti.stage.backgroundColor = '#303070';

    havonti.load.image('player', 'assets/player.png');
    havonti.load.image('empty', 'assets/empty.png');
    havonti.load.image('trigger', 'assets/trigger.png');
    havonti.load.image('blank', 'assets/blank.png');
  },

  create: function() {
    havonti.physics.startSystem(Phaser.Physics.ARCADE);

    this.blocks = havonti.add.group();
    this.blocks.enableBody = true;
    this.blocks.createMultiple(342, 'empty');

    this.triggers = havonti.add.group();
    this.triggers.enableBody = true;

    this.player.sprite = this.game.add.sprite(0, 0, 'player');
    havonti.physics.arcade.enable(this.player.sprite);

    // Set player maximum movement speed
    this.player.sprite.body.maxVelocity.setTo(
      this.player.MAXSPEEDX,
      this.player.MAXSPEEDY
    );

    this.game.input.keyboard.addKeyCapture([
      Phaser.Keyboard.A,
      Phaser.Keyboard.D,
      Phaser.Keyboard.W,
      Phaser.Keyboard.S
    ]);

    var firstRoom = this['the choice'];
    this.drawRoom(firstRoom);
    this.currentRoom = firstRoom;

    var x = 7 * this.GRIDWIDTH;
    var y = 8 * this.GRIDHEIGHT;
    this.player.sprite.reset(x, y);
  },

  stop: function() {
    this.stopX();
    this.stopY();
  },

  stopX: function() {
    this.player.sprite.body.velocity.x = 0;
    this.player.sprite.body.acceleration.x = 0;
  },

  stopY: function() {
    this.player.sprite.body.velocity.y = 0;
    this.player.sprite.body.acceleration.y = 0;
  },

  update: function() {
    //check block collision first thing
    havonti.physics.arcade.overlap(
      this.player.sprite,
      this.blocks,
      this.hitBlock,
      null,
      this
    );

    //check trigger collision
    havonti.physics.arcade.overlap(
      this.player.sprite,
      this.triggers,
      this.hitTrigger,
      null,
      this
    );

    // if no triggering, clear notification
    if (!this.player.triggering) {
      setNotifications('_');
    } else {
      this.player.triggering = false;
    }

    // if no collision, keep this good X and Y around
    if (!this.player.colliding) {
      this.player.goodX = this.player.sprite.body.x;
      this.player.goodY = this.player.sprite.body.y;
    } else {
      this.stopX();
      this.stopY();
      this.player.sprite.body.x = this.player.goodX;
      this.player.sprite.body.y = this.player.goodY;
      this.player.colliding = false;
    }

    // let the player move as they see fit
    if(this.input.keyboard.isDown(Phaser.Keyboard.W)) {
      this.player.sprite.body.acceleration.y = -this.player.MAXACCELY;
    }
    if(this.input.keyboard.isDown(Phaser.Keyboard.A)) {
      this.player.sprite.body.acceleration.x = -this.player.MAXACCELX;
    }
    if(this.input.keyboard.isDown(Phaser.Keyboard.S)) {
      this.player.sprite.body.acceleration.y = this.player.MAXACCELY;
    }
    if(this.input.keyboard.isDown(Phaser.Keyboard.D)) {
      this.player.sprite.body.acceleration.x = this.player.MAXACCELX;
    }

    if (!this.input.keyboard.isDown(Phaser.Keyboard.W) &&
        !this.input.keyboard.isDown(Phaser.Keyboard.S)) {
      this.stopY();
    }
    if (!this.input.keyboard.isDown(Phaser.Keyboard.A) &&
        !this.input.keyboard.isDown(Phaser.Keyboard.D)) {
      this.stopX();
    }
  },

  hitTrigger: function(player, trigger) {
    this.player.triggering = true;

    if (trigger.name === '⧗') {
      // inform ending 1
      setNotifications('<p class="dialogue">This path to ending 1</p>');
    }
    if (trigger.name === '⧖') {
      // goto ending 1
      gotoEnding1();
    }
    if (trigger.name === '⨎') {
      // inform ending 2
      setNotifications('<p class="dialogue">This path to ending 2</p>');
    }
    if (trigger.name === '⨍') {
      // goto ending 2
      gotoEnding2();
    }
  },

  transition: function (room, playerX, playerY) {
    this.triggers.forEach(function(b){
      b.kill();
    }, this);
    this.blocks.forEach(function(b){
      b.kill();
    }, this);

    this.drawRoom(room);
    this.currentRoom = room;
    this.player.sprite.body.position.x = playerX;
    this.player.sprite.body.position.y = playerY;
  },

  hitBlock: function() {
    this.player.colliding = true;
    this.stopX();
    this.stopY();
  },

  drawThing: function (x, y, thing) {
    thing.reset(x, y);
  },

  drawRoom: function (room) {
    var xVal, yVal;
    for (var i = 0; i < room.length; i++) {
      // -1 to avoid 'off-screen transit blocks'
      xVal = ((i%18) - 1) * this.GRIDWIDTH;
      yVal = ((trunc(i/18)) - 1) * this.GRIDHEIGHT;

      if (room[i] === '◼') {
        var hole = this.game.add.sprite(xVal, yVal, 'empty');
        this.blocks.add(hole);
      }

      if (room[i] === '⧗') {
        var warn1 = this.game.add.sprite(xVal, yVal, 'blank');
        warn1.name = '⧗';
        warn1.enableBody = true;
        this.triggers.add(warn1);
      }

      if (room[i] === '⧖') {
        var ending1 = this.game.add.sprite(xVal, yVal, 'trigger');
        ending1.name = '⧖';
        this.triggers.add(ending1);
      }

      if (room[i] === '⨎') {
        var warn2 = this.game.add.sprite(xVal, yVal, 'blank');
        warn2.name = '⨎';
        this.triggers.add(warn2);
      }

      if (room[i] === '⨍') {
        var ending2 = this.game.add.sprite(xVal, yVal, 'trigger');
        ending2.name = '⨍';
        this.triggers.add(ending2);
      }
    }
  }
};

havonti.state.add('havontiMain', havontiMainState);
havonti.state.start('havontiMain');