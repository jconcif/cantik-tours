import fs from 'fs';
import * as babel from '@babel/core';

const code = fs.readFileSync('src/pages/ItineraryPage.jsx', 'utf8');

babel.transform(code, {
  presets: ['@babel/preset-react']
}, function(err, result) {
  if (err) {
    console.error("SYNTAX ERROR:", err.message);
  } else {
    console.log("No syntax errors.");
  }
});
