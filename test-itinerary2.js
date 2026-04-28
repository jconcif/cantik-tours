import fs from 'fs';
import * as babel from '@babel/core';

const code = `<div className="test">{{driver_en:'...', economy:'Economy'}[booking.experience] || booking.experience}</div>`;

babel.transform(code, {
  presets: ['@babel/preset-react']
}, function(err, result) {
  if (err) {
    console.error("SYNTAX ERROR:", err.message);
  } else {
    console.log(result.code);
  }
});
