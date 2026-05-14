const sharp = require('sharp');
const fs = require('fs');

const inputPath = '/Users/javiercontreras/.gemini/antigravity/brain/376f812e-a566-49e4-8b08-368149f72168/media__1778781509127.png';
const outputPath = './public/images/logo.png';
const faviconPath = './public/favicon.png';
const appleIconPath = './public/apple-touch-icon.png';

async function processImage() {
  try {
    // We want to crop a square from the center. 
    // Let's try width: 680, height: 680
    const cropSize = 680;
    const offset = Math.floor((1024 - cropSize) / 2);

    // 1. Save main logo.png
    await sharp(inputPath)
      .extract({ left: offset, top: offset, width: cropSize, height: cropSize })
      .toFile(outputPath);
    console.log('Saved logo.png');

    // 2. Save favicon.png (32x32)
    await sharp(outputPath)
      .resize(32, 32)
      .toFile(faviconPath);
    console.log('Saved favicon.png');

    // 3. Save apple-touch-icon.png (180x180)
    await sharp(outputPath)
      .resize(180, 180)
      .toFile(appleIconPath);
    console.log('Saved apple-touch-icon.png');
    
    // 4. Also save favicon.ico
    // (We'll just copy favicon.png to favicon.ico or create a script later, since sharp doesn't output .ico directly)
    fs.copyFileSync(faviconPath, './public/favicon.ico');
    console.log('Copied to favicon.ico');

  } catch (error) {
    console.error('Error processing image:', error);
  }
}

processImage();
