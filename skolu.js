var skolu = new Phaser.Game(400, 400, Phaser.CANVAS, 'skoludiv');

var skoluMainState = {

  currentRoom: this['cave 01'],

  'cave 02':
  '000000000000000000' +
  '011111111111111110' +
  '011110000000011110' +
  '01111000ⵚ000011110' +
  '011110000000011110' +
  '011110000000011110' +
  '011110000000011110' +
  '011111100001111110' +
  '011111100001111110' +
  '011111100001111110' +
  '011111100001111110' +
  '011111100001111110' +
  '011111110011111110' +
  '011111110011111110' +
  '011111110011111110' +
  '011111110011111110' +
  '011111110011111110' +
  '00000000ⴹⴹ00000000'
  ,

  'cave 01':
  '00000000ⴺⴺ00000000' +
  '011111110011111110' +
  '011110000000001110' +
  '011100011100000110' +
  '011000111110011110' +
  '011000011100001110' +
  '011000001100001110' +
  '011000000000001110' +
  '011110000000000010' +
  '011100000000000110' +
  '011100001000000110' +
  '011110001111000010' +
  '011111000111110010' +
  '011111000001111110' +
  '011100000000111110' +
  '011110000001111110' +
  '011111110011111110' +
  '00000000ⵉⵉ00000000'
  ,

  'clearing':
  '000000000000000000' +
  '011111111111111110' +
  '011111111111111110' +
  '011111111111111110' +
  '011111111111111110' +
  '011111100000111110' +
  '011110000000000110' +
  '011100000000000110' +
  '011110000000001110' +
  '011100000000000110' +
  '011100000000000110' +
  '011100000000001110' +
  '011110000000111110' +
  '011111000000111110' +
  '011110000000001110' +
  '011100000000001110' +
  '011110000000111110' +
  '00000ɲɲɲɲɲɲɲ000000'
  ,

  'near tree':
  '00000ɳɳɳɳɳɳɳ000000' +
  '011110000000111110' +
  '011100011100001110' +
  '011000111110000010' +
  '010000111110000010' +
  '010000011100000110' +
  '011000001000000110' +
  '011100001000000110' +
  '011110001000001110' +
  '011100000000000110' +
  '0111000000Ð0000110' +
  '01ⵊ100000000000010' + // cave entrance here
  '010110000000110010' +
  '010011000000110010' +
  '010000000000000110' +
  '011000000000001110' +
  '011110000000011110' +
  '00000ⴳⴳⴳⴳⴳⴳⴳⴳ00000'
  ,

  'village':
  '00000ⴴⴴⴴⴴⴴⴴⴴⴴ00000' +
  '011110000000011110' +
  '011100000000000110' +
  '011001000000☺00010' +
  '010012100000000010' +
  '01000000☺000000110' +
  '011000000000100010' +
  '011000100001110010' +
  '010001210011111010' +
  '010000000011211010' +
  '010000000000000110' +
  '010001000☺00000010' +
  '01001210000100☹010' +
  '010000000011100010' +
  '01100☺000012100110' +
  '011000000000001110' +
  '011111111111111110' +
  '000000000000000000'
  ,
  portals: [
    'ɳ', // near tree -> clearing
    'ɲ', // clearing -> near tree
    'ⴹ', // cave02 -> cave01
    'ⴺ', // cave01 -> cave01
    'ⵉ', // cave01 -> near tree
    'ⵊ', // near tree -> cave01
    'ⴳ', // near tree -> village
    'ⴴ' // village -> near tree
  ],

  GRIDWIDTH: 25,
  GRIDHEIGHT: 25,

  player: {
    MAXSPEEDX: 200,
    MAXSPEEDY: 200,
    MAXACCELX: 1000,
    MAXACCELY: 1000
  },

  // game state
  boulderMoved: false,

  preload: function() {
    skolu.stage.backgroundColor = '#303030';

    skolu.load.image('player', 'assets/player.png');
    skolu.load.image('npc', 'assets/npc.png');
    skolu.load.image('block', 'assets/block.png');
    skolu.load.image('trigger', 'assets/trigger.png');
    skolu.load.image('caveentrance', 'assets/caveentrance.png');
    skolu.load.image('boulder', 'assets/boulder.png');
    skolu.load.image('shrine', 'assets/shrine.png');
  },

  create: function() {
    skolu.physics.startSystem(Phaser.Physics.ARCADE);

    this.blocks = skolu.add.group();
    this.blocks.enableBody = true;
    this.blocks.createMultiple(342, 'block');

    this.triggers = skolu.add.group();
    this.triggers.enableBody = true;

    this.player.sprite = this.game.add.sprite(0, 0, 'player');
    skolu.physics.arcade.enable(this.player.sprite);

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

    var firstRoom = this['near tree'];
    this.drawRoom(firstRoom);
    this.currentRoom = firstRoom;

    var x = 6 * this.GRIDWIDTH;
    var y = 6 * this.GRIDHEIGHT;
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
    skolu.physics.arcade.overlap(
      this.player.sprite,
      this.blocks,
      this.hitBlock,
      null,
      this
    );

    //check trigger collision
    skolu.physics.arcade.overlap(
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
    // near tree -> village
    if (trigger.name === 'ⴳ')
      this.transition(this['village'], trigger.position.x, 0);
    // village -> nearTree
    if (trigger.name === 'ⴴ')
      this.transition(this['near tree'], trigger.position.x,15*this.GRIDHEIGHT);
    // nearTree -> clearing
    if (trigger.name === 'ɳ')
      this.transition(this['clearing'], trigger.position.x, 15*this.GRIDHEIGHT);
    // clearing -> near tree
    if (trigger.name === 'ɲ')
      this.transition(this['near tree'], trigger.position.x, 0);
    // nearTree -> cave
    if (trigger.name === 'ⵊ')
      this.transition(this['cave 01'], 7*this.GRIDWIDTH, 15*this.GRIDHEIGHT);
    // cave01 -> near tree
    if (trigger.name === 'ⵉ')
      this.transition(this['near tree'], 1*this.GRIDWIDTH, 12*this.GRIDHEIGHT);
    // cave01 -> cave02
    if (trigger.name === 'ⴺ')
      this.transition(this['cave 02'], trigger.position.x, 15*this.GRIDHEIGHT);
    // cave02 -> cave01
    if (trigger.name === 'ⴹ')
      this.transition(this['cave 01'], trigger.position.x, 0);

    if (trigger.name === 'ⵚ') {
      // start glowing
      setNotifications('<p class="action">You feel a strange, red sensation.</p>');
      relicActive = true;

      if (terminalActive) {
        var entosLink = document.getElementById('skoluentoslink');
        entosLink.removeAttribute('hidden');
        setNotifications('<p class="action">... go farther ...</p>');

        if (!this.playingSong1) {
          console.log('playing song 1');
          playSong('song1');
          this.playingSong1 = true;
        }

      }
    } else {
      relicActive = false;
    }

    // ===============NPCS================ //
    // hit ☹ for boulder-moving guy

    if (trigger.name === 'Ð') {
      if (!this.boulderMoved) {
        setNotifications('<p class="dialogue">There is a strange shrine in the cave over there. Too bad there is a boulder in the way.</p>');
      } else {
        setNotifications('<p class="dialogue">Wow. How did he do that?</p>');
      }
    }

    if (trigger.name === '☹') {
      setNotifications('<p class="action">You want that boulder moved? DONE!</p>');
      this.boulderMoved = true; // yay
    }
    // hit ☺ for random-talking npc
    if (trigger.name === '☺') {
      // only happens once per npc
      if (!trigger.msg) {
        trigger.msg = '<p class="dialogue">default message</p>';
        var rand = Math.random();
        if (rand > 0.8)
          trigger.msg = '<p class="dialogue">yea verily I speak thusly!</p>';
        else if (rand > 0.6)
          trigger.msg = '<p class="dialogue">ho friend! how doth the day greet thee?</p>';
        else if (rand > 0.4)
          trigger.msg = '<p class="dialogue">...kings and dragons both! har har har</p>';
        else if (rand > 0.2)
          trigger.msg = '<p class="dialogue">ah mead, the drink of fantasy-settings</p>';
        else
          trigger.msg = '<p class="dialogue">I must go now. On a quest. A king\'s quest</p>';
      }
      setNotifications(trigger.msg);
    }
  },

  transition: function (room, playerX, playerY) {
    this.stopX();
    this.stopY();
    this.player.sprite.reset(playerX, playerY);

    this.triggers.forEach(function(b){
      b.kill();
    }, this);
    this.blocks.forEach(function(b){
      b.kill();
    }, this);
    if (this.boulder) {
      this.boulder.kill();
    }

    this.drawRoom(room);
    this.currentRoom = room;
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

      if (room[i] === '1') {
        this.drawThing(xVal, yVal, this.blocks.getFirstDead());
      }

      if (this.portals.indexOf(room[i]) !== -1) {
        var portal = this.game.add.sprite(xVal, yVal, 'caveentrance');
        portal.name = room[i];
        this.triggers.add(portal);
      }

      if (room[i] === '☺') {
        var npc = this.game.add.sprite(xVal, yVal, 'npc');
        npc.name = '☺';
        this.triggers.add(npc);
      }

      if (room[i] === 'Ð') {
        var bm = this.game.add.sprite(xVal, yVal, 'npc');
        bm.name = 'Ð';
        this.triggers.add(bm);
      }

      if (room[i] === '☹') {
        var bm = this.game.add.sprite(xVal, yVal, 'npc');
        bm.name = '☹';
        this.triggers.add(bm);
      }

      if (room[i] === 'ⵚ') {
        var shrine = this.game.add.sprite(xVal, yVal, 'shrine');
        shrine.name = 'ⵚ';
        this.triggers.add(shrine);
      }
    }

    // special stuff for boulder
    if (room === this['near tree']) {
      if (!this.boulderMoved) {
        this.boulder = this.game.add.sprite(1 * this.GRIDWIDTH, 11 * this.GRIDHEIGHT, 'boulder');
        this.blocks.add(this.boulder);
        this.boulder.enableBody = true;
      }
    }
  }
};

skolu.state.add('skoluMain', skoluMainState);
skolu.state.start('skoluMain');