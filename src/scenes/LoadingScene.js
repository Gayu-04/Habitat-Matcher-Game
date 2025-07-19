import Phaser from 'phaser';

export default class LoadingScene extends Phaser.Scene {
  constructor() {
    super({ key: 'LoadingScene' });
  }

  preload() {
    // Load the initial background image first
    this.load.image('loadingBackground', '/assets/background.png');
  }

  create() {
    // Set up background
    const bg = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'loadingBackground');
    bg.setDisplaySize(this.cameras.main.width, this.cameras.main.height);

    // Create progress elements
    this.createProgressBar();
    this.createPercentageText();

    // Set up event listeners BEFORE starting load
    this.load.on('progress', (value) => {
      this.updateProgressBar(value);
      this.updatePercentageText(value);
    });

    this.load.on('complete', () => {
      this.progressBar.destroy();
      this.progressText.destroy();
      this.scene.start('HomePage');
    });

    // Load all game assets
    this.loadGameAssets();

    // Start loading the queued assets
    this.load.start();
  }

  createProgressBar() {
    const { width, height } = this.scale;
    this.progressBar = this.add.graphics();
     // Draw rounded border
     this.progressBar.fillStyle(0x443120, 1);
     this.progressBar.fillRoundedRect(width * 0.1, height - 50, width * 0.8, 30, 10);
     this.progressBar.lineStyle(4, 0x443120, 1);
     this.progressBar.strokeRoundedRect(width * 0.1, height - 50, width * 0.8, 30, 10);
     
     // Fill the progress bar
     this.progressBar.fillStyle(0x26fef4, 1);
     this.progressBar.fillRoundedRect(width * 0.1, height - 50, 0, 30, 10);
  }

  createPercentageText() {
    const { width, height } = this.scale;
    this.progressText = this.add.text(width / 2, height - 90, '0%', {
      fontFamily: 'Arial',
      fontSize: '24px',
      color: '#000000',
      align: 'center'
    }).setOrigin(0.5);
  }

  updateProgressBar(progress) {
    const { width } = this.scale;
    this.progressBar.clear();
     // Draw rounded border
     this.progressBar.fillStyle(0x443120, 1);
     this.progressBar.fillRoundedRect(width * 0.1, this.scale.height - 100, width * 0.8, 30, 10);
     this.progressBar.lineStyle(4, 0x443120, 1);
     this.progressBar.strokeRoundedRect(width * 0.1, this.scale.height - 100, width * 0.8, 30, 10);
     
     // Fill the progress bar
     this.progressBar.fillStyle(0x26fef4, 1);
     this.progressBar.fillRoundedRect(
       width * 0.1,
       this.scale.height - 100,
       (width * 0.8) * progress,
       30,
    );
  }

  updatePercentageText(progress) {
    const percentage = Math.floor(progress * 100);
    this.progressText.setText(`Loading ... ${percentage}%`);
  }

  loadGameAssets() {
    // Load all game assets here
    
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
    
    //home page
    this.load.image('HomePageBackground', '/assets/background.png');
    this.load.image('rulesImage', '/assets/Rules.png');
    this.load.image('closeImage', '/assets/close.png');
    this.load.image('urbengardenbutton', '/assets/urbengardenbutton.png'); // Grassland button image
    this.load.image('desertButton', '/assets/desertButton.png'); // Desert button image
    this.load.image('greenForestButton', '/assets/greenforestButton.png'); // GreenForest button image
    this.load.image('rulesButtonImage', '/assets/rulesButton.png'); // Rules button image
    this.load.audio('buttonSound', '/assets/buttonSound.wav');
    this.load.image('homeButtonImage', '/assets/home.png'); // Home button image
    
    // Common assets
    this.load.image('goBackImage', '/assets/goback.png');
    this.load.image('gameOverImage', '/assets/gameover.png');
    this.load.image('menuButton', '/assets/menu.png');
    this.load.image('winImage', '/assets/win.png');
    this.load.image('heart', '/assets/heart.png');
    this.load.image('homeButtonImage', '/assets/home.png'); 
    this.load.image('rulepopup', '/assets/rulepopup.png'); // Load rules popup image
    this.load.image('home', '/assets/home.png');
  
    // Desert scene assets
    this.load.image('desertBackground', '/assets/desert.jpeg');
    this.load.image('AgaveCorrected', '/assets/AgaveCorrected.png');
    this.load.image('AcaciaCorrected', '/assets/AcaciaCorrected.png');
    this.load.image('PersianMesquiteCorrected', '/assets/PersianMesquiteCorrected.png');
    this.load.image('pricklypearcactusCorrected', '/assets/pricklypearCorrected.png');
    this.load.image('DatePalmCorrected', '/assets/DatePalmCorrected.png');
    this.load.image('headerImage', '/assets/Header.png');

    // Forest scene assets
    this.load.image('forestBackground', '/assets/forest.jpeg');
    this.load.image('ArjunaTreeCorrected', '/assets/ArjunaTreeCorrected.png');
    this.load.image('BeachAlmondCorrected', '/assets/BeachAlmondCorrected.png');
    this.load.image('RedSilkCottonCorrected', '/assets/RedSilkCottonCorrected.png');
    this.load.image('TeakCorrected', '/assets/TeakCorrected.png');
    this.load.image('FlameOfTheForestCorrected', '/assets/FlameOfTheForestCorrected.png');
    this.load.image('header2Image', '/assets/HeaderForest.png');

    // Urban Garden assets
    this.load.image('urbangardenBackground', '/assets/urbangarden.jpeg');
    this.load.image('AfricanTulipCorrected', '/assets/AfricanTulipCorrected.png');
    this.load.image('RainTreeCorrected', '/assets/RainTreeCorrected.png');
    this.load.image('JasmineCorrected', '/assets/JasmineCorrected.png');
    this.load.image('GulmoharCorrected', '/assets/GulmoharCorrected.png');
    this.load.image('FrangipaniCorrected', '/assets/FrangipaniCorrected.png');
    this.load.image('header1Image', '/assets/HeaderUrban.png');

    //sound
    this.load.audio('winSound', '/assets/winsound.mp3');  //win page
    this.load.audio('wrongSound', '/assets/wrongsound.mp3'); // Load the wrong selection card
    this.load.audio('gameoverSound', '/assets/gameoversound.mp3');  //gameover page
    this.load.audio('correctSound', '/assets/correctsound.mp3');  //correct card


    // Wrong answer assets
    const wrongAssets = [
      'teakWrong', 'redsilkcottonWrong', 'raintreeWrong', 'fragipaniWrong',
      'jasmineWrong', 'gulmoharWrong', 'flameoftheforestWrong', 'beachalmondWrong',
      'arjunwrong', 'africantulipWrong', 'cactusWrong', 'agaveWrong',
      'datepalmWrong', 'persianWrong', 'acaciaWrong'
    ];
    
    wrongAssets.forEach(asset => {
      this.load.image(asset, `/assets/wrong/${asset}.png`);
    });
  }
}
