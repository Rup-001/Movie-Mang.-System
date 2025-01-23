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





exports.home = async (req, res) => {
  res.status(200).json(

    `
    Welcome to the Home Route. This route is accessible to all users without requiring authentication. For a detailed understanding, please refer to the documentation or review the descriptions provided below.

    Below is the organized list of all URLs, along with their HTTP methods and endpoints:

    Home Routes:

    GET Method: https://movie-mang-system.up.railway.app/

    Auth Routes:

    POST Method: https://movie-mang-system.up.railway.app/login

    POST Method: https://movie-mang-system.up.railway.app/registration

    Movie Routes:

    GET Method: https://movie-mang-system.up.railway.app/movie

    POST Method: https://movie-mang-system.up.railway.app/movie/create-movie

    GET Method: https://movie-mang-system.up.railway.app/movie/details/:movieId

    PUT Method: https://movie-mang-system.up.railway.app/movie/update/:movieId

    POST Method: https://movie-mang-system.up.railway.app/movie/rate/:movieId

    Report Routes:

    POST Method: https://movie-mang-system.up.railway.app/report/:movieId

    GET Method: https://movie-mang-system.up.railway.app/report

    POST Method: https://movie-mang-system.up.railway.app/report/:movieId/action


Here is the description with detailed information:
    
    {
  "baseURL": "https://movie-mang-system.up.railway.app",
  "routes": {
    "authRoutes": {
      "basePath": "/",
      "endpoints": [
        {
          "method": "GET",
          "path": "/",
          "description": "This is the home route accessible to all users. No authentication is required to access this endpoint.",
          "response": {
            "message": ""
          }
        },
        {
          "method": "POST",
          "path": "/login",
          "description": "This route allows users to log in to the system. Submit your credentials to access the system.",
          "requestBody": {
            "emailOrUsername": "string (required)",
            "password": "string (required)"
          },
          "response": {
            "success": true,
            "message": "Logged in as user4",
            "token": "Bearer {{token}}",
            "username": "user4",
            "role": "admin"
        }
        },
        {
          "method": "POST",
          "path": "/registration",
          "description": "This route allows new users to register in the system. Provide your name, email, and password to create an account.",
          "requestBody": {    
              "username": "user1",
              "email": "user1@google.com",
              "password": "12345",
              "role": "admin"           
          },
          "response": {
            "message": "User registered successfully",
            "user": {
                "id": "679150cca6a531099eb520f9",
                "username": "user1",
                "email": "user1@google.com",
                "role": "admin"
            }
          }
        }
      ]
    },
    "movieRoutes": {
      "basePath": "/movie",
      "description": "Routes for managing movies in the system. Only for authenticate users",
      "endpoints": [
        {
          "method": "GET",
          "path": "/",
          "description": "This route provides a list of all movies available in the system. You can explore movie titles and details here.",
          "response": {
            "movies": "Array of movie objects containing title, description, rating, and release date."
          }
        },
        {
          "method": "POST",
          "path": "/create-movie",
          "description": "This route allows authorized users to add a new movie to the system. Provide the required details to create a movie entry.",
          "requestBody": {
            "title": "Inception",
            "description": "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.",
            "released_at": "2010-07-16",
            "duration": "2h 28m",
            "genre": "Sci-Fi",
            "language": "English"
          },
          "response": {
            "message": "Movie created successfully. The new movie is now available in the system.",
            "movie" : "movie Information"
          }
        },
        {
          "method": "GET",
          "path": "/details/:movieId",
          "description": "Use this route to get detailed information about a specific movie by providing its ID.",
          "response": "details about the movie"
        },
        {
          "method": "PUT",
          "path": "/update/:movieId",
          "description": "This route allows authorized users to update information about a specific movie by providing its ID.",
          "requestBody": {
            "title": "string (optional)",
            "description": "string (optional)",
            "released_at": "string (optional)",
            "genre": "number (optional)",
            "language": "number (optional)",
            "duration": "number (optional)"
          },
          "response": "success response about movie update"
        },
        {
          "method": "POST",
          "path": "/rate/:movieId",
          "description": "This route allows users to rate a specific movie by providing its ID and their rating score.",
          "requestBody": {
            "rating": "number (required) between 1 to 5"
          },
          "response": {
            "message": "Movie reported successfully",
            "movie" : "details about movie"
          }
        },
        {
          "method": "POST",
          "path": "/report/:movieId",
          "description": "This route allows users to report any issues or concerns about a specific movie by providing its ID.",
          "requestBody": {
            "reason": "string"
          },
          "response": {
            "message": "Movie reported successfully",
            "movie" : "movie Information"
          }
        }
      ]
    },
    "reportRoutes": {
      "basePath": "/report",
      "description": "Routes for managing reports related to movies in the system.",
      "endpoints": [
        {
          "method": "POST",
          "path": "/:movieId",
          "description": "This route allows users to report any issues or concerns about a specific movie by providing its ID.",
          "requestBody": {
            "reason": "string"
          },
          "response": {
            "message": "Movie reported successfully",
            "movie" : "movie Information"
          }
        },
        {
          "method": "GET",
          "path": "/",
          "description": "This route is for admins to view all reported movies and their respective details. This is only for admin",
          "response": {
            "reports": "Array of report objects with details about the reported movies."
          }
        },
        {
          "method": "POST",
          "path": "/:movieId/action",
          "description": "Admins can use this route to take action on a specific reported movie by providing its ID and the action to be taken.",
          "requestBody": {
            "action": "string (e.g., 'approve', 'reject')"
          },
          "response": {
            "message": "Message  based on the action"
          }
        }
      ]
    }
  }
}

    
    
    
    `

  )
}