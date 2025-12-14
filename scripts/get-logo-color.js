import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const Vibrant = require('node-vibrant');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const imgPath = path.resolve(__dirname, '..', 'public', 'bookmatrix-logo.png');

const v = new Vibrant(imgPath);
v.getPalette()
  .then(palette => {
    const swatches = ['Vibrant','Muted','DarkVibrant','DarkMuted','LightVibrant','LightMuted'];
    let hex = null;
    for (const s of swatches) {
      if (palette[s]) { hex = palette[s].getHex(); break; }
    }
    console.log(hex || '#0f7aa3');
  })
  .catch(err => {
    console.error('ERROR extracting color:', err.message || err);
    process.exit(1);
  });
