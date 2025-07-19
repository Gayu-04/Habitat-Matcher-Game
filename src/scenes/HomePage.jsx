// src/scenes/HomePage.jsx
import Phaser from 'phaser';

export class HomePage extends Phaser.Scene {
  constructor() {
    super({ key: 'HomePage' });
  }

  preload() {
    // Load assets for background, button images, rules, and close button
    this.load.image('HomePageBackground', '/assets/background.png');
    this.load.image('rulesImage', '/assets/Rules.png');
    this.load.image('closeImage', '/assets/close.png');
    this.load.image('urbengardenbutton', '/assets/urbengardenbutton.png'); // Grassland button image
    this.load.image('desertButton', '/assets/desertButton.png'); // Desert button image
    this.load.image('greenForestButton', '/assets/greenforestButton.png'); // GreenForest button image
    this.load.image('rulesButtonImage', '/assets/rulesButton.png'); // Rules button image
    this.load.audio('buttonSound', '/assets/buttonSound.wav');
    this.load.image('homeButtonImage', '/assets/home.png'); // Home button image
    
  }

  create() {
    // Add a full-screen background image
    this.add.image(
      this.sys.game.config.width / 2,
      this.sys.game.config.height / 2,
      'HomePageBackground'
    ).setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);

    // Define button dimensions matching the image dimensions
    const buttonWidth = 350;  // Width of the button (matches image width)
    const buttonHeight = 180; // Height of the button (matches image height)
    const buttonSpacing = 1; // Vertical spacing between buttons
    const buttonYStart = this.sys.game.config.height / 1.4 - (buttonHeight * 1.2); // Starting Y position for the buttons
    const buttonX = this.sys.game.config.width / 2; // Center alignment for buttons

    // Load button sound
    const buttonSound = this.sound.add('buttonSound');

    // Button data with images and scenes
    const buttonData = [
      { key: 'urbengardenbutton', scene: 'UrbenGarden', yOffset: 0 },
      { key: 'desertButton', scene: 'Desert', yOffset: buttonHeight + buttonSpacing },
      { key: 'greenForestButton', scene: 'GreenForest', yOffset: (buttonHeight + buttonSpacing) * 2 },
    ];

    // Add button images for each scene
    buttonData.forEach((button) => {
      const buttonImage = this.add.image(
        buttonX,
        buttonYStart + button.yOffset,
        button.key
      )
        .setInteractive({ useHandCursor: true })
        .setDisplaySize(buttonWidth, buttonHeight); // Match button size to image dimensions

      // Add interactivity for the button
      buttonImage
        .on('pointerover', () => {
          buttonImage.setTint(0xffcc00); // Highlight button on hover
        })
        .on('pointerout', () => {
          buttonImage.clearTint(); // Remove highlight on hover out
        })
        .on('pointerdown', () => {
          buttonSound.play();
          this.scene.start(button.scene); // Navigate to the respective scene
        });
    });

    // Add a rules button at the top

    const rulesButton = this.add.image(1820, 70, 'rulesButtonImage') // Positioning the home button
      .setInteractive({ useHandCursor: true })
      .setDisplaySize(120, 110); // Adjust size for home button
      
     // const rulesButton = this.add.image(
      //this.sys.game.config.width / 1.05,
      //this.sys.game.config.height - 880, //position
      //'rulesButtonImage'
    //)
     // .setInteractive({ useHandCursor: true })
      //.setDisplaySize(120, 110); // Adjust size for rules button

    rulesButton
      .on('pointerover', () => {
        rulesButton.setTint(0xffcc00); // Highlight button on hover
      })
      .on('pointerout', () => {
        rulesButton.clearTint(); // Remove highlight on hover out
      })
      .on('pointerdown', () => {
        buttonSound.play();
        this.showrulesPopup();
      });

    // Add home button in the top left corner
    const homeButton = this.add.image(80, 70, 'homeButtonImage') // Positioning the home button
      .setInteractive({ useHandCursor: true })
      .setDisplaySize(150, 150); // Adjust size for home button

    homeButton
      .on('pointerover', () => {
        homeButton.setTint(0xffcc00); // Highlight home button on hover
      })
      .on('pointerout', () => {
        homeButton.clearTint(); // Remove highlight on hover out
      })
      .on('pointerdown', () => {
        this.sound.play('buttonSound');
        setTimeout(() => {
        window.open('http://games.rrbcea.org/', '_self'); // Navigate to the specified URL
      }, 200); // Small delay to allow sound to play
      });
  }

  showrulesPopup() {
    // Create a semi-transparent background
    const popupBackground = this.add.graphics();
    popupBackground.fillStyle(0x000000, 0.7);
    popupBackground.fillRect(0, 0, this.sys.game.config.width, this.sys.game.config.height);

    // Add the rules image
    const rulesImage = this.add.image(
      this.sys.game.config.width / 2,
      this.sys.game.config.height / 2,
      'rulesImage'
    ).setDisplaySize(
      (9 * this.sys.game.config.width) / 10,
      (9 * this.sys.game.config.height) / 10
    );

     // Load button sound
     const buttonSound = this.sound.add('buttonSound');

    // Add a close button
    const closeButton = this.add.image(
      rulesImage.x + rulesImage.displayWidth / 2 - 500, // Just outside the right boundary
      rulesImage.y - rulesImage.displayHeight / 2 + 180, // Just above the top boundary
      'closeImage'
    ).setDisplaySize(90, 90).setInteractive();

    closeButton
      .on('pointerdown', () => {
        buttonSound.play();
        // Destroy popup elements when the close button is clicked
        popupBackground.destroy();
        rulesImage.destroy();
        closeButton.destroy();
      })
      .on('pointerover', () => {
        closeButton.setTint(0xffcc00); // Highlight close button on hover
      })
      .on('pointerout', () => {
        closeButton.clearTint(); // Remove highlight on hover out
      });
  }
}