const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log('📥 Login Request:', { email, password });

  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await userModel.getUserByEmail(email);
    console.log('🧑‍💻 User from DB:', user);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('🔐 Password Match:', isMatch);

    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    delete user.password;

    // Create JWT
    

    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
module.exports = { loginUser };
