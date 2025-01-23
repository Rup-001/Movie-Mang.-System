Movie Management System API

Welcome to the Movie Management System API! This API enables users to manage movies, rate them, and report issues. Below is a detailed overview of the API endpoints, user accounts, and access guidelines.


Pre-Created Users
Three users have been created for testing purposes:

Email: user1@example.com	username : user1
Email: user2@example.com	username : user2 
Email: admin@example.com	username : admin

password : 12345

Overview
The root route (/) is accessible to all users without requiring authentication. For more information, please refer to the organized list of endpoints below.

API Endpoints:
        
Home Routes

GET Method: https://movie-mang-system.up.railway.app/

Auth Routes

POST Method: https://movie-mang-system.up.railway.app/login
POST Method: https://movie-mang-system.up.railway.app/registration
Movie Routes

GET Method: https://movie-mang-system.up.railway.app/movie
POST Method: https://movie-mang-system.up.railway.app/movie/create-movie
GET Method: https://movie-mang-system.up.railway.app/movie/details/:movieId
PUT Method: https://movie-mang-system.up.railway.app/movie/update/:movieId
POST Method: https://movie-mang-system.up.railway.app/movie/rate/:movieId
Report Routes

POST Method: https://movie-mang-system.up.railway.app/report/:movieId
GET Method: https://movie-mang-system.up.railway.app/report
POST Method: https://movie-mang-system.up.railway.app/report/:movieId/action


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
