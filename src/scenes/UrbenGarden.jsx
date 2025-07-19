import Phaser from 'phaser';

export class UrbenGarden extends Phaser.Scene {

  constructor() {
    super({ key: 'UrbenGarden' });
  }

  init() {
    this.dragAttempts = 10; // Limit to 10 drops
    this.hearts = []; // Array to hold heart images
    this.plantCount = 0; // Count of plants added to the desert
    this.maxPlants = 5; // Maximum number of plants allowed in the desert
    this.gameOver = false; // Track game over state
    this.win = false; // Track win state
  }

  preload() {
    this.load.image('urbangardenBackground', '/assets/urbangarden.jpeg');
    this.load.image('goBackImage', '/assets/goBack.png');
    this.load.image('AfricanTulipCorrected', '/assets/AfricanTulipCorrected.png');  
    this.load.image('RainTreeCorrected', '/assets/RainTreeCorrected.png');
    this.load.image('JasmineCorrected', '/assets/JasmineCorrected.png');  
    this.load.image('GulmoharCorrected', '/assets/GulmoharCorrected.png'); 
    this.load.image('FrangipaniCorrected', '/assets/FrangipaniCorrected.png');
    this.load.image('gameOverImage', '/assets/gameover.png'); // Load game over image
    this.load.image('menuButton', '/assets/menu.png'); 
    this.load.image('winImage', '/assets/win.png'); 
    this.load.image('header1Image', '/assets/HeaderUrban.png');
    this.load.image('heart', '/assets/heart.png'); // Load heart image
    this.load.image('persianWrong', '/assets/wrong/persianWrong.png');
    this.load.image('acaciaWrong', '/assets/wrong/acaciaWrong.png'); 
    this.load.image('datepalmWrong', '/assets/wrong/datepalmWrong.png');
    this.load.image('cactusWrong', '/assets/wrong/cactusWrong.png');
    this.load.image('agaveWrong', '/assets/wrong/agaveWrong.png'); 
    this.load.image('flameoftheforestWrong', '/assets/wrong/flameoftheforestWrong.png');
    this.load.image('beachalmondWrong', '/assets/wrong/beachalmondWrong.png');
    this.load.image('arjunwrong', '/assets/wrong/arjunwrong.png'); 
    this.load.image('teakWrong', '/assets/wrong/teakWrong.png');
    this.load.image('redsilkcottonWrong', '/assets/wrong/redsilkcottonWrong.png'); 
    this.load.image('rulepopup', '/assets/rulepopup.png');
    this.load.audio('winSound', '/assets/winsound.mp3'); // win sound
    this.load.audio('wrongSound', '/assets/wrongsound.mp3'); // Load the wrong selection sound
    this.load.audio('gameoverSound', '/assets/gameoversound.mp3');  //gameover page
    this.load.audio('correctSound', '/assets/correctsound.mp3');  //correct card
    this.load.image('homeButtonImage', '/assets/home.png'); // Home button image

    const plantImages = [
      'Acacia', 'PricklyPearCactus', 'DatePalm', 'Agave',
      'PersianMesquite', 'AfricanTulip', 'Gulmohar',
      'Jasmine', 'Frangipani', 'RedSilkCotton', 'ArjunaTree',
      'RainTree', 'BeachAlmond', 'FlameOfTheForest', 'Teak'
    ];

    plantImages.forEach(image => {
      this.load.image(image, `/assets/${image}.jpeg`);
      this.load.image(`${image}1`, `/assets/${image}1.jpeg`); // Load the "replacement" images
    });
  }

  create() {
    this.cameras.main.setBackgroundColor('#FAF3E0');

    document.body.style.overflow = 'hidden';
    
    const habitatSize = {
      width: this.sys.game.config.width / 2,
      height: this.sys.game.config.height / 2.5
    };

    const positions = {
      desert: { x: this.sys.game.config.width / 2, y: this.sys.game.config.height / 4 }
    };

    const desertGraphics = this.add.graphics();
    desertGraphics.lineStyle(2, 0x4E342E, 1);
    desertGraphics.strokeRoundedRect(
      positions.desert.x - habitatSize.width / 2,
      positions.desert.y - habitatSize.height / 2,
      habitatSize.width,
      habitatSize.height,
      10
    );
    desertGraphics.fillStyle(0xFFF7E1, 1);
    desertGraphics.fillRoundedRect(
      positions.desert.x - habitatSize.width / 2,
      positions.desert.y - habitatSize.height / 2,
      habitatSize.width,
      habitatSize.height,
      10
    );

    this.add.image(positions.desert.x , positions.desert.y, 'urbangardenBackground')
      .setDisplaySize(habitatSize.width, habitatSize.height);
      
    const headerWidth = 1150; 
    const headerHeight = 500; 
    
    this.add.image(this.sys.game.config.width / 2, 5 , 'header1Image')
      .setOrigin(0.5, 0)
      .setDisplaySize(headerWidth, headerHeight);

    this.add.text(this.sys.game.config.width / 2, 130, '', {
      font: '36px Roboto',
      fill: '#6D4C41'
    }).setOrigin(0.5);
    
    const heartCount = 5;
    const heartSpacing = 45; 
    const heartSize = 30; 
    
    for (let i = 0; i < heartCount; i++) {
      const heart = this.add.image(
        this.sys.game.config.width / 1.45 - (heartCount - 1) * (heartSize + heartSpacing) / 2 + i * (heartSize + heartSpacing),
        40,
        'heart'
      ).setDisplaySize(heartSize, heartSize);
      this.hearts.push(heart);
    }

    const cardData = [
      { key: 'Acacia', name: 'Babhul', widthRatio: 0.07, heightRatio: 0.2 },
      { key: 'PricklyPearCactus', name: 'Prickly Pear Cactus', widthRatio: 0.07, heightRatio: 0.2 },
      { key: 'DatePalm', name: 'Date Palm', widthRatio: 0.07, heightRatio: 0.2 },
      { key: 'Agave', name: 'Agave', widthRatio: 0.07, heightRatio: 0.2 },
      { key: 'RedSilkCotton', name: 'Red Silk Cotton', widthRatio: 0.07, heightRatio: 0.2 },
      { key: 'PersianMesquite', name: 'Persian Mesquite', widthRatio: 0.07, heightRatio: 0.2 },
      { key: 'AfricanTulip', name: 'African Tulip', widthRatio: 0.07, heightRatio: 0.2 },
      { key: 'Gulmohar', name: 'Gulmohar', widthRatio: 0.07, heightRatio: 0.2 },
      { key: 'Jasmine', name: 'Jasmine', widthRatio: 0.07, heightRatio: 0.2 },
      { key: 'Frangipani', name: 'Frangipani', widthRatio: 0.07, heightRatio: 0.2 },
      { key: 'ArjunaTree', name: 'Arjun', widthRatio: 0.07, heightRatio: 0.2 },
      { key: 'Teak', name: 'Teak', widthRatio: 0.07, heightRatio: 0.2 },
      { key: 'RainTree', name: 'RainTree', widthRatio: 0.07, heightRatio: 0.2 },
      { key: 'FlameOfTheForest', name: 'Flame Of The Forest', widthRatio: 0.07, heightRatio: 0.2 },
      { key: 'BeachAlmond', name: 'BeachAlmond', widthRatio: 0.07, heightRatio: 0.2 }
    ];

    Phaser.Utils.Array.Shuffle(cardData);

    const cardPlacement = [
      { xRatio: 0.1, yRatio: 0.58 }, { xRatio: 0.2, yRatio: 0.58 }, { xRatio: 0.3, yRatio: 0.58 },
      { xRatio: 0.4, yRatio: 0.58 }, { xRatio: 0.5, yRatio: 0.58 }, { xRatio: 0.6, yRatio: 0.58 },
      { xRatio: 0.7, yRatio: 0.58 }, { xRatio: 0.8, yRatio: 0.58 }, { xRatio: 0.9, yRatio: 0.58 },
      { xRatio: 0.25, yRatio: 0.83 }, { xRatio: 0.35, yRatio: 0.83 }, { xRatio: 0.45, yRatio: 0.83 },
      { xRatio: 0.55, yRatio: 0.83 }, { xRatio: 0.65, yRatio: 0.83 }, { xRatio: 0.75, yRatio: 0.83 }
    ];

    const originalPositions = {};

    const allowedPlants = ['RainTree', 'AfricanTulip', 'Gulmohar', 'Jasmine', 'Frangipani',];
    const heartRemovingPlants = [  'RedSilkCotton', 'ArjunaTree',  'BeachAlmond', 'FlameOfTheForest', 'Teak','Acacia', 'PricklyPearCactus', 'DatePalm', 'Agave', 'PersianMesquite'];

    this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
     
        gameObject.x = dragX;
        gameObject.y = dragY;
      
    });

    

    this.input.on('dragend', (pointer, gameObject) => {
        const originalPosition = gameObject.getData('originalPosition');
        const isInDesert = gameObject.x > positions.desert.x - habitatSize.width / 2 &&
          gameObject.x < positions.desert.x + habitatSize.width / 2 &&
          gameObject.y > positions.desert.y - habitatSize.height / 2 &&
          gameObject.y < positions.desert.y + habitatSize.height / 2;

        if (isInDesert && allowedPlants.includes(gameObject.getData('plantKey'))) {
          if (this.plantCount < this.maxPlants) { 
          gameObject.setAlpha(0);

           // ✅ Play the correct selection sound
           this.sound.play('correctSound');
           
          const correctedKey = {
            'RainTree': 'RainTreeCorrected',
            'AfricanTulip': 'AfricanTulipCorrected',
            'Gulmohar': 'GulmoharCorrected',
            'Jasmine': 'JasmineCorrected',
            'Frangipani': 'FrangipaniCorrected'
          }[gameObject.getData('plantKey')];

          if (correctedKey) {
            const totalWidth = (this.plantCount * gameObject.width) + (this.plantCount * 10);
            const correctedImageX = positions.desert.x - (totalWidth / 2) + (gameObject.width / 2);
            const correctedImageY = positions.desert.y;

            const correctedImage = this.add.image(correctedImageX, correctedImageY, correctedKey)
              .setDisplaySize(gameObject.width, gameObject.height)
              .setOrigin(0.5)
              .setDepth(10);

            this.tweens.add({
              targets: correctedImage,
              width: gameObject.width * 1.2,
              height: gameObject.height * 1.2,
              duration: 300,
              ease: 'Bounce'
            });

            this.plantCount++;
            this.dragAttempts--; // Decrement attempts only when a plant is successfully placed

            // Check for win condition
            if (this.plantCount === this.maxPlants) {
              this.showWinImage();
            }
          }
        } else {
          // If the limit is reached, return the plant to its original position
          gameObject.setPosition(originalPosition.x, originalPosition.y);
        } 
      }else if (isInDesert && heartRemovingPlants.includes(gameObject.getData('plantKey'))) {
          // Remove a heart when dropping these plants
          if (this.hearts.length > 0) {
            const heart = this.hearts.pop();
            heart.setAlpha(0); // Hide the heart
          }
          // Play the wrong selection sound
          this.sound.play('wrongSound');

          const { x, y } = originalPosition;
          gameObject.setAlpha(0);
         // ✅ Add a wrong image **at the original position**
        const wrongKey = {
          'Acacia': 'acaciaWrong',
          'PersianMesquite': 'persianWrong',
          'DatePalm': 'datepalmWrong',
          'Agave': 'agaveWrong',
          'PricklyPearCactus': 'cactusWrong',
          'ArjunaTree': 'arjunwrong',
          'RedSilkCotton': 'redsilkcottonWrong',
          'BeachAlmond': 'beachalmondWrong',
          'FlameOfTheForest': 'flameoftheforestWrong',
          'Teak': 'teakWrong'
        }[gameObject.getData('plantKey')];
  
        if (wrongKey) {
          this.add.image(x, y, wrongKey) // Now the wrong image appears at the original position
            .setDisplaySize(gameObject.width, gameObject.height)
            .setOrigin(0.5)
            .setDepth(10);
        }
      
    
        } else {
          // Return the plant to its original position
          gameObject.setPosition(originalPosition.x, originalPosition.y);
        }
     });

    cardData.forEach((card, index) => {
      const position = cardPlacement[index];
      const x = this.sys.game.config.width * position.xRatio;
      const y = this.sys.game.config.height * position.yRatio;
      const width = this.sys.game.config.width * card.widthRatio;
      const height = this.sys.game.config.height * card.heightRatio;

      const cardContainer = this.add.container(x, y);

      cardContainer.setData('originalPosition', { x, y });
      cardContainer.setData('plantKey', card.key);

      const shadow = this.add.graphics();
      shadow.fillStyle(0x616161, 0.2);
      shadow.fillRoundedRect(-width / 2 + 5, -height / 2 + 5, width, height, 10);
      cardContainer.add(shadow);

      const graphics = this.add.graphics();
      graphics.lineStyle(2, 0xBDBDBD, 1);
      graphics.strokeRoundedRect(-width / 2, -height / 2, width, height, 10);
      graphics.fillStyle(0xF5F5F5, 1);
      graphics.fillRoundedRect(-width / 2, -height / 2, width, height, 10);
      cardContainer.add(graphics);

      const cardSprite = this.add.sprite(0, 0, card.key).setDisplaySize(width * 0.8, height * 0.8);
      cardContainer.add(cardSprite);

      const cardText = this.add.text(0, height / 2 + 20, card.name, {
        font: '16px Roboto',
        fill: '#6D4C41',
        align: 'center'
      }).setOrigin(0.5);
      cardContainer.add(cardText);

      cardContainer.setSize(width, height);
      cardContainer.setInteractive();
      this.input.setDraggable(cardContainer);

      cardContainer.on('pointerover', () => {
        graphics.setFillStyle(0xFFC107, 1);
        shadow.setAlpha(0.3);
      });

      cardContainer.on('pointerout', () => {
        graphics.setFillStyle(0xF5F5F5, 1);
        shadow.setAlpha(0.2);
      });
    });

    const goBackButton = this.add.image(60, 60, 'goBackImage')
      .setInteractive()
      .setOrigin(0.44)
      .setScale(0.5);

    goBackButton.on('pointerup', () => {
      
      this.scene.start('HomePage');
    });

    goBackButton.on('pointerover', () => {
      goBackButton.setTint(0xFFC107);
    });

    goBackButton.on('pointerout', () => {
      goBackButton.clearTint();
    });

    // Show the rules popup image for 5 seconds
    const rulePopup = this.add.image(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'rulepopup')
      .setOrigin(0.5)
      .setDisplaySize(1000, 600) // Adjust size as needed
      .setDepth(100); // Ensure it's above other elements

    // Create a semi-transparent overlay for blur effect
    const overlay = this.add.graphics();
    overlay.fillStyle(0x000000, 0.7); // Black with 50% opacity
    overlay.fillRect(0, 0, this.sys.game.config.width, this.sys.game.config.height);
    overlay.setDepth(99); // Below the rule popup but above the game

    // Apply blur effect to the overlay
    overlay.setAlpha(0.5); // Adjust alpha for desired blur effect

    this.time.delayedCall(5000, () => {
      rulePopup.destroy(); // Remove the popup after 5 seconds
      overlay.destroy(); // Remove the overlay after the popup
    });
  }

  update() {
    if (this.hearts.length === 0 && !this.gameOver) {
      this.gameOver = true; // Prevent multiple triggers

      // Disable input for plants but keep it enabled for buttons
      this.input.off('drag');
      this.input.off('dragend');

      // Play win sound
      this.sound.play('gameoverSound');

      // Show Game Over Image
      const gameOverImage = this.add.image(
        this.sys.game.config.width / 2, 
        this.sys.game.config.height / 2, 
        'gameOverImage'
      )
      .setOrigin(0.5)
      .setDisplaySize(1200, 700) // Set the width and height for the win image
      .setDepth(100);
      // Create a semi-transparent overlay
      const overlay = this.add.graphics();
      overlay.fillStyle(0x000000, 0.5); // Black with 50% opacity
      overlay.fillRect(0, 0, this.sys.game.config.width, this.sys.game.config.height);
      overlay.setDepth(99); // Below the game over image but above the game

      // Create Go main page Button
      const goBackButton = this.add.image(
        this.sys.game.config.width / 2 - 100, 
        this.sys.game.config.height / 1.32, 
        'homeButtonImage'
      )
      .setInteractive()
      .setOrigin(0.5)
      .setScale(0.4)
      .setDepth(110); // Above gameOverImage

      goBackButton.on('pointerup', () => {
        this.sound.play('buttonSound');
        window.open('http://games.rrbcea.org/', '_self');   //main page button  
      });

      goBackButton.on('pointerover', () => goBackButton.setTint(0xFFC107));
      goBackButton.on('pointerout', () => goBackButton.clearTint());

      // Create Menu Button
      const menuButton = this.add.image(
        this.sys.game.config.width / 2 + 100, 
        this.sys.game.config.height / 1.32, 
        'menuButton'
      )
      .setInteractive()
      .setOrigin(0.5)
      .setScale(0.4)
      .setDepth(110);

      menuButton.on('pointerup', () => {
        this.sound.play('buttonSound');
        this.scene.start('HomePage');    //this is main menu button
      });

      menuButton.on('pointerover', () => menuButton.setTint(0xFFC107));
      menuButton.on('pointerout', () => menuButton.clearTint());
    }
  }

  showWinImage() {
    if (!this.win) {
      this.win = true; // Prevent multiple triggers
  
      // Play win sound
    this.sound.play('winSound');

      // Disable input for plants but keep it enabled for buttons
      this.input.off('drag');
      this.input.off('dragend');
  
      // Show Win Image
      const winImage = this.add.image(
        this.sys.game.config.width / 2, 
        this.sys.game.config.height / 2, 
        'winImage'
      )
      .setOrigin(0.5)
      .setDisplaySize(1200, 700) // Set the width and height for the win image
      .setDepth(100); // Ensure it's above other elements
  
      // Create a semi-transparent overlay
      const overlay = this.add.graphics();
      overlay.fillStyle(0x000000, 0.5); // Black with 50% opacity
      overlay.fillRect(0, 0, this.sys.game.config.width, this.sys.game.config.height);
      overlay.setDepth(99); // Below the win image but above the game
  
      // Display remaining hearts
      const heartCount = this.hearts.length; // Get the remaining heart count
      const heartSpacing = 45; 
      const heartSize = 50; // Size of the hearts
  
      // Calculate the starting position for the hearts to center them
      const heartsYPosition = this.sys.game.config.height / 2; // Center vertically with the win image
      const heartsXPosition = this.sys.game.config.width / 2 - (heartCount - 1) * (heartSize + heartSpacing) / 2; // Center horizontally
  
      for (let i = 0; i < heartCount; i++) {
        this.add.image(
          heartsXPosition + i * (heartSize + heartSpacing), // Position hearts horizontally
          heartsYPosition,
          'heart' // Use the heart image
        ).setDisplaySize(heartSize, heartSize) // Set the size for hearts
        .setDepth(101); // Ensure hearts are above the win image
      }
  
      // Create Go main page Button
      const goBackButton = this.add.image(
        this.sys.game.config.width / 2 - 100, 
        this.sys.game.config.height / 1.32, 
        'homeButtonImage'
      )
      .setInteractive()
      .setOrigin(0.5)
      .setScale(0.4)
      .setDepth(110); // Above winImage
  
      goBackButton.on('pointerup', () => {
        this.sound.play('buttonSound');
        window.open('http://games.rrbcea.org/', '_self');   //main page button  
      });
  
      goBackButton.on('pointerover', () => goBackButton.setTint(0xFFC107));
      goBackButton.on('pointerout', () => goBackButton.clearTint());
  
      // Create Menu Button
      const menuButton = this.add.image(
        this.sys.game.config.width / 2 + 100, 
        this.sys.game.config.height / 1.32, 
        'menuButton'
      )
      .setInteractive()
      .setOrigin(0.5)
      .setScale(0.4)
      .setDepth(110);
  
      menuButton.on('pointerup', () => {
        this.sound.play('buttonSound');
        this.scene.start('HomePage');    //this is main menu button
      });
  
      menuButton.on('pointerover', () => menuButton.setTint(0xFFC107));
      menuButton.on('pointerout', () => menuButton.clearTint());
    }
  }

  // Reset the game state when the scene is restarted
  resetGame() {
    this.dragAttempts = 10;
    this.hearts = [];
    this.plantCount = 0;
    this.maxPlants = 5;
    this.gameOver = false;
    this.win = false; // Reset win state

    // Reset hearts
    const heartCount = 5;
    const heartSpacing = 45; 
    const heartSize = 30; 
    
    for (let i = 0; i < heartCount; i++) {
      const heart = this.add.image(
        this.sys.game.config.width / 1.275 - (heartCount - 1) * (heartSize + heartSpacing) / 2 + i * (heartSize + heartSpacing),
        30,
        'heart'
      ).setDisplaySize(heartSize, heartSize);
      this.hearts.push(heart);
    }
  }
}