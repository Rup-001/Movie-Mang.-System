# Movie Management System API

Welcome to the Movie Management System API! This API enables users to manage movies, rate them, and report issues. Below is a detailed overview of the API endpoints, user accounts, and access guidelines.

## Pre-Created Users
Three users have been created for testing purposes:

- **Email:** user1@example.com | **Username:** user1  
- **Email:** user2@example.com | **Username:** user2  
- **Email:** admin@example.com | **Username:** admin  

**Password:** `12345`

## Overview
The root route (`/`) is accessible to all users without requiring authentication. For more information, please refer to the organized list of endpoints below.

## API Endpoints

### Home Routes
- **GET**: [https://movie-mang-system.up.railway.app/](https://movie-mang-system.up.railway.app/)

### Auth Routes
- **POST**: [https://movie-mang-system.up.railway.app/login](https://movie-mang-system.up.railway.app/login)  
- **POST**: [https://movie-mang-system.up.railway.app/registration](https://movie-mang-system.up.railway.app/registration)

### Movie Routes
- **GET**: [https://movie-mang-system.up.railway.app/movie](https://movie-mang-system.up.railway.app/movie)  
- **POST**: [https://movie-mang-system.up.railway.app/movie/create-movie](https://movie-mang-system.up.railway.app/movie/create-movie)  
- **GET**: [https://movie-mang-system.up.railway.app/movie/details/:movieId](https://movie-mang-system.up.railway.app/movie/details/:movieId)  
- **PUT**: [https://movie-mang-system.up.railway.app/movie/update/:movieId](https://movie-mang-system.up.railway.app/movie/update/:movieId)  
- **POST**: [https://movie-mang-system.up.railway.app/movie/rate/:movieId](https://movie-mang-system.up.railway.app/movie/rate/:movieId)

### Report Routes
- **POST**: [https://movie-mang-system.up.railway.app/report/:movieId](https://movie-mang-system.up.railway.app/report/:movieId)  
- **GET**: [https://movie-mang-system.up.railway.app/report](https://movie-mang-system.up.railway.app/report)  
- **POST**: [https://movie-mang-system.up.railway.app/report/:movieId/action](https://movie-mang-system.up.railway.app/report/:movieId/action)

---

For more detailed information, refer to `documentation.txt` or visit the home route.
