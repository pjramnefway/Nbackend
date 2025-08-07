const bcrypt = require('bcrypt');

const plainPassword='password';

bcrypt.hash(plainPassword, 10).then((hash) => {
  console.log('✅Hashed Password:',hash);
});
