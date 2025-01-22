const User = require('../models/user.model')
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

exports.loginUser = async (req, res) => {
    try {
      const { emailOrUsername, password } = req.body;
  
      // Check if emailOrUsername is provided in the request body
      if (!emailOrUsername) {
        return res.status(400).json({
          success: false,
          message: "Email or username is required",
        });
      }
  
      // Determine whether the input is an email or username
      let user;
      if (emailOrUsername.includes('@')) {
        // If it contains '@', it's an email
        user = await User.findOne({ email: emailOrUsername });
      } else {
        // Otherwise, it's a username
        user = await User.findOne({ username: emailOrUsername });
      }
  
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "User not found",
        });
      }
  
      // Verify the password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: "Incorrect password",
        });
      }
  
      // Create the JWT payload
      const payload = {
        id: user._id,              // User's unique ID
        username: user.username,   // Username
        email: user.email,         // Email
        role: user.role,           // Role (e.g., user/admin)
      };
  
      // Sign the JWT (create the token)
      const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "2d" });
  
      // Send the Bearer token to the client
      res.status(200).json({
        success: true,
        message: `Logged in as ${user.username}`,
        token: `Bearer ${token}`,  // Send token as Bearer token
        username: user.username,
        role: user.role
      });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ message: "Server error during login." });
    }
  };


exports.registrationUser = async (req, res) => {
    const { username, email, password, role } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: "User with this email or username already exists" });
        }

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create a new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            role, // Optional: Ensure role is set by default to 'user'
        });

        // Save the user to the database
        await newUser.save();

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                role: newUser.role,
            },
        });
    } catch (error) {
        console.error("Error in registration:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
}


exports.Protected = async (req, res) => {
    res.status(200).json({
        message: 'Welcome to the protected route!',
        user: req.user, // User data from the JWT payload
      })
}
exports.Protecteduser = async (req, res) => {
    res.status(200).json({
        message: 'Welcome to the protected route!',
        user: req.user, // User data from the JWT payload
      })
}