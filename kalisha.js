var kalisha = new Phaser.Game(400, 400, Phaser.CANVAS, 'kalishadiv');

var kalishaMainState = {

  currentRoom: this['terminal room'],

  'terminal room':
  '000000000000000000' +
  '011111111111111110' +
  '0111☹00ⵌⵌⵌⵌ0000110' +  // here's the guy!
  '011100000000000110' +
  '011100000000000110' +
  '011100000000☺00110' +
  '011100000000000110' +
  '011100☺00000000110' +
  '011100000000000110' +
  '0111000000☺0000110' +
  '011100000000000110' +
  '011100000000000110' +
  '011111100001111110' +
  '011111100001111110' +
  '011111100001111110' +
  '011111100001111110' +
  '011111110011111110' +
  '00000000ⴹⴹ00000000'
  ,

  'terminal building entrance':
  '000000000000000000' +
  '0◼◼◼◼◼111111◼◼◼◼◼0' +
  '0◼◼◼◼◼11ⴺⴺ11◼◼◼◼◼0' + // building entrance here
  '011100000000001110' +
  '011100000000001110' +
  '011100000000001110' +
  '011100000000001110' +
  '011100000000001110' +
  '011100000000001110' +
  '011100000000001110' +
  '011100000000001110' +
  '011111100001111110' +
  '011111100001111110' +
  '011111100001111110' +
  '011111100001111110' +
  '011111100001111110' +
  '011111100001111110' +
  '0000000ⵉⵉⵉⵉ0000000'
  ,

  'intersection':
  '0000000ⵊⵊⵊⵊ0000000' +
  '011111100001111110' +
  '011111100001111110' +
  '011111100001111110' +
  '011111100001111110' +
  '011111100001111110' +
  '0110☺0000000000110' +
  '01100000000☺000110' +
  '♆0000000000000000ⴳ' +
  '♆0000000000000000ⴳ' +
  '♆00000000000☺0000ⴳ' +
  '011000☺00000000110' +
  '011000000000000110' +
  '011110000000011110' +
  '01111000000☺011110' +
  '011110000000011110' +
  '011111111111111110' +
  '000000000000000000'
  ,

  'teleporter room':
  '000000000000000000' +
  '011111111111111110' +
  '011000000000000110' +
  '0110♺000♺000♶00110' +  // here it is
  '011000000000000110' +
  '0110♺000♺000♺00110' +
  '011000000000000110' +
  '0110♺000♺000♺00110' +
  '011000000000000110' +
  '011000000000000110' +
  '011000000000000110' +
  '0110000000®0000110' +
  '011100000000001110' +
  '011110000000011110' +
  '011111000000111110' +
  '011111100001111110' +
  '011111110011111110' +
  '00000000⚒⚒00000000'
  ,

  'teleporter building entrance':
  '000000000000000000' +
  '011111111111111110' +
  '01111☗111111☗11110' +
  '011☗1111111111☗110' +
  '01111111☗☗11111110' +
  '01111111☗☗11111110' +
  '011000000000000110' +
  '011000000000000110' +
  'ⴴ00000000000000110' +
  'ⴴ00000000000000110' +
  'ⴴ00000000000000110' +
  '011000000000000110' +
  '011000000000000110' +
  '011111111111111110' +
  '011111111111111110' +
  '011111111111111110' +
  '011111111111111110' +
  '000000000000000000'
  ,

  'market':
  '000000000000000000' +
  '011111111111111110' +
  '011111111111111110' +
  '011111111111111110' +
  '011111111111111110' +
  '011111100000001110' +
  '011000000000⚇00110' +
  '011000©0000⛂⛂⛂0110' +  // here he is
  '01100⛂⛂⛂000000000♈' +
  '01100000000000000♈' +
  '01100000000000000♈' +
  '01100Æ000000µ00110' +
  '0110⛂⛂⛂0000⛂⛂⛂0110' +
  '011110000000011110' +
  '011111110011111110' +
  '011111111111111110' +
  '011111111111111110' +
  '000000000000000000'
  ,

  portals: [
    'ⴹ', // terminal room -> terminal building entrance
    'ⴺ', // terminal building entrance -> terminal room
    'ⵉ', // terminal building entrance -> intersection
    'ⵊ', // intersection -> terminal building entrance
    'ⴳ', // intersection -> teleporter building entrance
    'ⴴ', // teleporter building entrance -> intersection
    '☗', // teleporter building entrance -> teleporter room
    '⚒', // teleporter room -> teleporter building entrance
    '♆', // intersection -> market
    '♈' // market -> intersection
  ],

  GRIDWIDTH: 25,
  GRIDHEIGHT: 25,

  player: {
    MAXSPEEDX: 200,
    MAXSPEEDY: 200,
    MAXACCELX: 1000,
    MAXACCELY: 1000
  },

  playingSong1: false,
  playingSong2: false,

  //game states
  transporterActive: false,
  spokeToTransporterGuy: false,
  trinketPurchased: false,
  terminalOpen: false,

  preload: function() {
    kalisha.stage.backgroundColor = '#303030';

    kalisha.load.image('player', 'assets/player.png');
    kalisha.load.image('npc', 'assets/npc.png');
    kalisha.load.image('wall', 'assets/wall.png');
    kalisha.load.image('terminal', 'assets/terminal.png');
    kalisha.load.image('caveentrance', 'assets/caveentrance.png');
    kalisha.load.image('empty', 'assets/empty.png');
    kalisha.load.image('teleporter', 'assets/teleporter.png');
    kalisha.load.image('table', 'assets/table.png');
  },

  create: function() {
    kalisha.physics.startSystem(Phaser.Physics.ARCADE);

    this.walls = kalisha.add.group();
    this.walls.enableBody = true;
    this.walls.createMultiple(342, 'wall');

    this.triggers = kalisha.add.group();
    this.triggers.enableBody = true;

    this.player.sprite = this.game.add.sprite(0, 0, 'player');
    kalisha.physics.arcade.enable(this.player.sprite);

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

    var firstRoom = this['intersection'];
    this.drawRoom(firstRoom);
    this.currentRoom = firstRoom;

    var x = 5 * this.GRIDWIDTH;
    var y = 9 * this.GRIDHEIGHT;
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
    //check wall collision first thing
    kalisha.physics.arcade.overlap(
      this.player.sprite,
      this.walls,
      this.hitWall,
      null,
      this
    );

    //check trigger collision
    kalisha.physics.arcade.overlap(
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
    //console.log('triggering: ', trigger.name, trigger.position.x, trigger.position.y, ' with: ', player.position.x, player.position.y);

    // ===============PORTALS============== //
    // terminal room -> terminal building entrance
    if (trigger.name === 'ⴹ')
      this.transition(this['terminal building entrance'], trigger.position.x, 3*this.GRIDHEIGHT);
    // terminal building entrance -> terminal room
    if (trigger.name === 'ⴺ')
      this.transition(this['terminal room'], trigger.position.x,15*this.GRIDHEIGHT);
    // terminal building entrance -> intersection
    if (trigger.name === 'ⵉ')
      this.transition(this['intersection'], trigger.position.x, 0);
    // intersection -> terminal building entrance
    if (trigger.name === 'ⵊ')
      this.transition(this['terminal building entrance'], trigger.position.x, 15*this.GRIDHEIGHT);
    // intersection -> teleporter building entrance
    if (trigger.name === 'ⴳ')
      this.transition(this['teleporter building entrance'], 1*this.GRIDWIDTH, trigger.position.y);
    // teleporter building entrance -> intersection
    if (trigger.name === 'ⴴ')
      this.transition(this['intersection'], 15*this.GRIDWIDTH, trigger.position.y);
    // teleporter building entrance -> teleporter room
    if (trigger.name === '☗') {
      var y = 14*this.GRIDHEIGHT;
      this.transition(this['teleporter room'], trigger.position.x, y);
    }
    // teleporter room -> teleporter building entrance
    if (trigger.name === '⚒')
      this.transition(this['teleporter building entrance'], trigger.position.x, 5*this.GRIDHEIGHT);
    // intersection -> market
    if (trigger.name === '♆')
      this.transition(this['market'], 15*this.GRIDWIDTH, trigger.position.y);

    // market -> intersection
    if (trigger.name === '♈')
      this.transition(this['intersection'], 1*this.GRIDWIDTH, trigger.position.y);

    if (trigger.name === '♺') {
      if (this.transporterActive) {
        setNotifications('<p class="dialogue">still broken</p>');
      } else {
        setNotifications('<p class="dialogue">this teleporter is broken</p>');
      }
    }

    if (trigger.name === '♶') {
      if (this.transporterActive) {
        // start glowing green... you now have access to skolu!!!! yay!!!
        setNotifications('<p class="action">you hear a voice... "welcome, traveler" ...</p>');
        var skoluLink = document.getElementById('kalishaskolulink');
        skoluLink.removeAttribute('hidden');

        if (!this.playingSong2) {
          console.log('playing song 2');
          playSong('song2');
          this.playingSong2 = true;
        }

      } else {
        setNotifications('<p class="dialogue">this teleporter is broken</p>');
      }
    }

    if (trigger.name === '©') {
      if (!this.spokeToTransporterGuy) {
        setNotifications('<p class="dialogue">buy my data fractures! only PI credits!</p>');
      } else {
        setNotifications('<p class="dialogue">sold! one data fracture!</p>');
        this.trinketPurchased = true;
      }
    }

    if (trigger.name === '⚇') {
      setNotifications('<p class="dialogue">buy my class-5 weapons!</p>');
    }

    if (trigger.name === 'µ') {
      setNotifications('<p class="dialogue">buy my havontis! cheap!</p>');
    }

    if (trigger.name === 'Æ') {
      setNotifications('<p class="dialogue">buy my plane shifters!</p>');
    }

    if (trigger.name === '®') {
      if (!this.trinketPurchased) {
        setNotifications('<p class="dialogue">Go to the market, buy me a data fracture, and I will let you inspect this weird teleporter array.</p>');
        this.spokeToTransporterGuy = true;
      } else {
        setNotifications('<p class="dialogue">That teleporter there seems to be emitting a strange hum.</p>');
        this.transporterActive = true;
      }
    }

    if (trigger.name === 'ⵌ') {
      if (this.terminalOpen) {
        // start glowing red... if cave glowing red too, you now get entos link!
        setNotifications('<p class="action">You feel a strange, red sensation.</p>');
        terminalActive = true;

        if (relicActive) {
          var entosLink = document.getElementById('kalishaentoslink');
          entosLink.removeAttribute('hidden');
          setNotifications('<p class="action">... go farther ...</p>');

          if (!this.playingSong1) {
            console.log('playing song 1');
            playSong('song1');
            this.playingSong1 = true;
          }

        }
      } else {
        setNotifications('<p class="dialogue">Terminal is locked.</p>');
      }
      
    } else {
      terminalActive = false;
    }

    // ===============NPCS================ //
    // hit ☹ for terminal-access guy
    if (trigger.name === '☹') {
      setNotifications('<p class="action">You seem trustworthy. The Passcode for the terminal is: "kittnz1!"</p>');
      this.terminalOpen = true; // yay
    }
    // hit ☺ for random-talking npc
    if (trigger.name === '☺') {
      // only happens once per npc
      if (!trigger.msg) {
        trigger.msg = '<p class="dialogue">default message2368</p>';
        var rand = Math.random();
        if (rand > 0.8)
          trigger.msg = '<p class="dialogue">er mah gerd</p>';
        else if (rand > 0.6)
          trigger.msg = '<p class="dialogue">let me take a selfie</p>';
        else if (rand > 0.4)
          trigger.msg = '<p class="dialogue">... one of us... one of us...</p>';
        else if (rand > 0.2)
          trigger.msg = '<p class="dialogue">did you hear the latest about our overlord, the hypno-toad? he\'s great!</p>';
        else
          trigger.msg = '<p class="dialogue">...but it do!</p>';
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
    this.walls.forEach(function(b){
      b.kill();
    }, this);

    this.drawRoom(room);
    this.currentRoom = room;
  },

  hitWall: function() {
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
      // -1 to avoid 'off-screen transit walls'
      xVal = ((i%18) - 1) * this.GRIDWIDTH;
      yVal = ((trunc(i/18)) - 1) * this.GRIDHEIGHT;

      if (room[i] === '1') {
        this.drawThing(xVal, yVal, this.walls.getFirstDead());
      }

      if (room[i] === '◼') {
        var dropoff = this.game.add.sprite(xVal, yVal, 'empty');
        this.walls.add(dropoff);
        dropoff.name = '◼';
      }

      if (room[i] === '⛂') {
        var table = this.game.add.sprite(xVal, yVal, 'table');
        this.walls.add(table);
        table.name = '⛂';
      }

      if (this.portals.indexOf(room[i]) !== -1) {
        var portal = this.game.add.sprite(xVal, yVal, 'caveentrance');
        portal.name = room[i];
        this.triggers.add(portal);
      }

      if (room[i] === '♺') {
        var tpbroke = this.game.add.sprite(xVal, yVal, 'teleporter');
        tpbroke.name = '♺';
        this.triggers.add(tpbroke);
      }

      if (room[i] === '♶') {
        var teleporter = this.game.add.sprite(xVal, yVal, 'teleporter');
        teleporter.name = '♶';
        this.triggers.add(teleporter);
      }

      if (room[i] === '☺') {
        var npc = this.game.add.sprite(xVal, yVal, 'npc');
        npc.name = '☺';
        this.triggers.add(npc);
      }

      if (room[i] === '☹') {
        var bm = this.game.add.sprite(xVal, yVal, 'npc');
        bm.name = '☹';
        this.triggers.add(bm);
      }

      if (room[i] === '©') {
        var bm = this.game.add.sprite(xVal, yVal, 'npc');
        bm.name = '©';
        this.triggers.add(bm);
      }

      if (room[i] === '⚇') {
        var bm = this.game.add.sprite(xVal, yVal, 'npc');
        bm.name = '⚇';
        this.triggers.add(bm);
      }

      if (room[i] === 'Æ') {
        var bm = this.game.add.sprite(xVal, yVal, 'npc');
        bm.name = 'Æ';
        this.triggers.add(bm);
      }

      if (room[i] === 'µ') {
        var bm = this.game.add.sprite(xVal, yVal, 'npc');
        bm.name = 'µ';
        this.triggers.add(bm);
      }

      if (room[i] === '®') {
        var bm = this.game.add.sprite(xVal, yVal, 'npc');
        bm.name = '®';
        this.triggers.add(bm);
      }

      if (room[i] === 'ⵌ') {
        var terminal = this.game.add.sprite(xVal, yVal, 'terminal');
        terminal.name = 'ⵌ';
        this.triggers.add(terminal);
      }
    }
  }
};

kalisha.state.add('kalishaMain', kalishaMainState);
kalisha.state.start('kalishaMain');