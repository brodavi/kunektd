var entos = new Phaser.Game(400, 400, Phaser.CANVAS, 'entosdiv');

var entosMainState = {

  currentRoom: this['maze'],

  'maze':
  '000000000000000000' +
  '011111111111111110' +
  '010000000000000010' +
  '010000000000000010' +
  '010000111111110010' +
  '010000000000010010' +
  '011110000000010010' +
  '010010010010010010' +
  '010010010010010010' +
  '010010010010010010' +
  '010010010010010010' +
  '010011110010010010' +
  '010000000010010010' +
  '010000000011110010' +
  '011111110000000010' +
  '010000010000000010' +
  '011111110011111110' +
  '00000000ⴹⴹ00000000'
  ,

  'hall of pillars':
  '00000000ⴺⴺ00000000' +
  '011111110011111110' +
  '010000000000000010' +
  '010110011001100010' +
  '010110011001100010' +
  '010000000000000010' +
  '010001100110011010' +
  '010001100110011010' +
  'ɲ0000000000000000ɳ' +
  'ɲ000000000☹000000ɳ' +
  '010110011001100010' +
  '010110011001100010' +
  '010000000000000010' +
  '010011001100110010' +
  '010011001100110010' +
  '010000000000000010' +
  '011111110011111110' +
  '00000000ⵉⵉ00000000'
  ,

  'hole':
  '000000000000000000' +
  '011111111111111110' +
  '010000000000000010' +
  '010000000000000010' +
  '010000000000000010' +
  '010000000000000010' +
  '0100000♼♼♼♼♼000010' +
  '0100000♼000♼000010' +
  '♩000000♼0⛃0♼000010' +
  '♩000000♼000♼000010' +
  '0100000♼♼♼♼♼000010' +
  '010000000000000010' +
  '010000000000000010' +
  '010000000000000010' +
  '010000000000000010' +
  '010000000000000010' +
  '011111111111111110' +
  '000000000000000000'
  ,

  'iching':
  '000000000000000000' +
  '011111111111111110' +
  '010000000000000010' +
  '010000000000000010' +
  '010011111111110010' +
  '010011111111110010' +
  '010000000000000010' +
  '010000000000000010' +
  '010011⨂1001111000⚏' +
  '01001111001111000⚏' +
  '010000000000000010' +
  '010000000000000010' +
  '010011111111110010' +
  '010011111111110010' +
  '010000000000000010' +
  '010000000000000010' +
  '011111111111111110' +
  '000000000000000000'
  ,

  'corridor':
  '00000000ⴴⴴ00000000' +
  '011111110011111110' +
  '01◼◼◼◼100001◼◼◼◼10' +
  '01◼◼◼◼100001◼◼◼◼10' +
  '01◼◼◼◼100001◼◼◼◼10' +
  '01◼◼◼◼100001◼◼◼◼10' +
  '01◼◼◼◼100001◼◼◼◼10' +
  '01◼◼◼◼100001◼◼◼◼10' +
  '01◼◼◼◼100001◼◼◼◼10' +
  '01◼◼◼◼100001◼◼◼◼10' +
  '01◼◼◼◼100001◼◼◼◼10' +
  '01◼◼◼◼100001◼◼◼◼10' +
  '01◼◼◼◼100001◼◼◼◼10' +
  '01◼◼◼◼100001◼◼◼◼10' +
  '01◼◼◼◼100001◼◼◼◼10' +
  '01◼◼◼◼100001◼◼◼◼10' +
  '011111110011111110' +
  '00000000☮☮00000000'
  ,

  'game room':
  '00000000♕♕00000000' +
  '011111110011111110' +
  '010000000000000010' +
  '010111100001110010' +
  '010100000001010010' +
  '010101100001110010' +
  '010100100001010010' +
  '010111100001010010' +
  '010000000000000010' +
  '010110110001110010' +
  '010101010001000010' +
  '010101010001100010' +
  '010100010001000010' +
  '010100010001110010' +
  '010000000000000010' +
  '010000000000000010' +
  '011111111111111110' +
  '000000000000000000'
  ,

  portals: [
    'ɳ', // hall of pillars -> hole
    '♩', // hole -> hall of pillars
    'ɲ', // hall of pillars -> iching
    '⚏', // iching -> hall of pillars
    'ⴺ', // hall of pillars -> maze
    'ⴹ', // maze -> hall of pillars
    'ⵉ', // hall of pillars -> corridor
    'ⴴ', // corridor -> hall of pillars
    '☮', // corridor -> game room
    '♕' // game room -> corridor
  ],

  GRIDWIDTH: 25,
  GRIDHEIGHT: 25,

  player: {
    MAXSPEEDX: 200,
    MAXSPEEDY: 200,
    MAXACCELX: 1000,
    MAXACCELY: 1000
  },

  holeOpened: false,

  preload: function() {
    entos.stage.backgroundColor = '#603030';

    entos.load.image('player', 'assets/player.png');
    entos.load.image('npc', 'assets/npc.png');
    entos.load.image('barrier', 'assets/barrier.png');
    entos.load.image('trigger2', 'assets/trigger2.png');
    entos.load.image('caveentrance', 'assets/caveentrance.png');
    entos.load.image('empty', 'assets/empty.png');
  },

  create: function() {
    entos.physics.startSystem(Phaser.Physics.ARCADE);

    this.barriers = entos.add.group();
    this.barriers.enableBody = true;
    this.barriers.createMultiple(342, 'barrier');

    this.triggers = entos.add.group();
    this.triggers.enableBody = true;

    this.player.sprite = this.game.add.sprite(0, 0, 'player');
    entos.physics.arcade.enable(this.player.sprite);

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

    var firstRoom = this['hall of pillars'];
    this.drawRoom(firstRoom);
    this.currentRoom = firstRoom;

    var x = 7 * this.GRIDWIDTH;
    var y = 11 * this.GRIDHEIGHT;
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
    //check barrier collision first thing
    entos.physics.arcade.overlap(
      this.player.sprite,
      this.barriers,
      this.hitBarrier,
      null,
      this
    );

    //check trigger collision
    entos.physics.arcade.overlap(
      this.player.sprite,
      this.triggers,
      this.hitTrigger,
      null,
      this
    );

    // if no triggering, clear notification
    if (!this.player.triggering) {
      setNotifications('<p class="dialogue">_</p>');
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

    // ===============PORTALS============== //
    // hall of pillars -> hole
    if (trigger.name === 'ɳ')
      this.transition(this['hole'], 1*this.GRIDWIDTH,trigger.position.y);
    // hole -> hall of pillars
    if (trigger.name === '♩')
      this.transition(this['hall of pillars'], 15*this.GRIDWIDTH, trigger.position.y);
    // hall of pillars -> iching
    if (trigger.name === 'ɲ')
      this.transition(this['iching'], 15*this.GRIDWIDTH, trigger.position.y);
    // iching -> hall of pillars
    if (trigger.name === '⚏')
      this.transition(this['hall of pillars'], 1*this.GRIDWIDTH, trigger.position.y);
    // hall of pillars -> maze
    if (trigger.name === 'ⴺ')
      this.transition(this['maze'], trigger.position.x, 15*this.GRIDHEIGHT);
    // maze -> hall of pillars
    if (trigger.name === 'ⴹ')
      this.transition(this['hall of pillars'], trigger.position.x, 1*this.GRIDHEIGHT);
    // hall of pillars -> corridor
    if (trigger.name === 'ⵉ')
      this.transition(this['corridor'], trigger.position.x, 1*this.GRIDHEIGHT);
    // corridor -> hall of pillars
    if (trigger.name === 'ⴴ')
      this.transition(this['hall of pillars'], trigger.position.x, 15*this.GRIDHEIGHT);

    // corridor -> game room
    if (trigger.name === '☮')
      this.transition(this['game room'], trigger.position.x, 1*this.GRIDHEIGHT);
    // game room -> corridor
    if (trigger.name === '♕')
      this.transition(this['corridor'], trigger.position.x, 15*this.GRIDHEIGHT);

    // ===============NPCS================ //
    // hit ☹ for creepy guy
    if (trigger.name === '☹') {
      setNotifications('<p class="dialogue">I too am lost.</p>');
    }

    // open that hole
    if (trigger.name === '⨂') {
      this.holeOpened = true;
      setNotifications('<p class="dialogue">The path to the end is clear.</p>');
    }

    // fall down the hole into another world
    if (trigger.name === '⛃' &&
        this.holeOpened) {
      gotoHavonti();
    }    
  },

  transition: function (room, playerX, playerY) {
    this.stopX();
    this.stopY();
    this.player.sprite.reset(playerX, playerY);

    this.triggers.forEach(function(b){
      b.kill();
    }, this);
    this.barriers.forEach(function(b){
      b.kill();
    }, this);

    this.drawRoom(room);
    this.currentRoom = room;
  },

  hitBarrier: function() {
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
      // -1 to avoid 'off-screen transit barriers'
      xVal = ((i%18) - 1) * this.GRIDWIDTH;
      yVal = ((trunc(i/18)) - 1) * this.GRIDHEIGHT;

      if (room[i] === '1') {
        this.drawThing(xVal, yVal, this.barriers.getFirstDead());
      }

      if (this.portals.indexOf(room[i]) !== -1) {
        var portal = this.game.add.sprite(xVal, yVal, 'caveentrance');
        portal.name = room[i];
        this.triggers.add(portal);
      }

      if (room[i] === '☹') {
        var bm = this.game.add.sprite(xVal, yVal, 'npc');
        bm.name = '☹';
        this.triggers.add(bm);
      }

      if (room[i] === '⨂') {
        var trigger = this.game.add.sprite(xVal, yVal, 'trigger2');
        trigger.name = '⨂';
        this.triggers.add(trigger);
      }

      if (room[i] === '⛃') {
        var hole = this.game.add.sprite(xVal, yVal, 'empty');
        hole.name = '⛃';
        this.triggers.add(hole);
      }

      if (room[i] === '♼' &&
          !this.holeOpened) {
        var holeBarrier = this.game.add.sprite(xVal, yVal, 'barrier');
        holeBarrier.name = '♼';
        this.barriers.add(holeBarrier);
      }

    }
  }
};

entos.state.add('entosMain', entosMainState);
entos.state.start('entosMain');