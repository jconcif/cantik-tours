import bcrypt from 'bcryptjs';
const password = 'CantikBali2024!';
const hash = await bcrypt.hash(password, 10);
console.log('HASH:', hash);
