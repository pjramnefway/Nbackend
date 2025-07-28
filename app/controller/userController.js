const userModel = require('../models/userModel');

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await userModel.getUserByEmail(email);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // If you're not using bcrypt, use plain comparison (as you're doing)
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { loginUser };
