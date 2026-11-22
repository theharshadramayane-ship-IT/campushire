const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Temporary in-memory database (Baad me MySQL se replace hoga)
let users = []; 

// Secret key for JWT (Production me .env me rakhna)
const JWT_SECRET = 'supersecret_campushire_key';

// 1. Register (Signup) Logic
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Milestone College Email Verification Check
    const emailRegex = /^[a-zA-Z0-9._%+-]+@milestone\.edu\.in$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Only @milestone.edu.in emails are allowed!" });
    }

    // Check if user already exists
    const userExists = users.find(u => u.email === email);
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = {
      id: users.length + 1,
      name,
      email,
      password: hashedPassword,
      role: role || 'student'
    };

    users.push(newUser);

    res.status(201).json({ message: "User registered successfully!", user: newUser.name });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 2. Login Logic
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT Token
    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { registerUser, loginUser };