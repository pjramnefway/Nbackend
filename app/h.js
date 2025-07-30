const bcrypt = require('bcrypt');

const plainPassword = 'hashedpassword123';

bcrypt.hash(plainPassword, 10).then((hash) => {
  console.log('✅ Hashed Password:', hash);
});
