# U05 - TopWarMovies

Welcome to U05 - TopWarMovies where all my favourite war movies are stored in a mongo database. An admin will be able to create, edit and delete movies from the database. A user will be able to view the list of movies and different types of information and attributes related to them.

## Installation

Download and install Node.js: https://nodejs.org/en/download/

Run these terminal commands to install the dependencies:
```bash
npm init -y # Create a package.json file
npm install express mongoose # Install Express and Mongoose
npm install --save-dev @types/express @types/node nodemon ts-node typescript # Install development dependencies for TypeScript, Node.ts, express and Nodemon
```

## Design - RESRTful API

### Object Model - Resources

My resources are Warmovies and Users.

### Resource URIs

```
api/v1/warmovies
api/v1/warmovies/:id
api/v1//auth/register
api/v1/auth/login
api/v1/users

```

### Resource representations

```json
    
    Movies: {
        "id": "ObjectId",
        "title": "String",
        "plot": "Text",
        "releaseYear": "Number",
        "director": "String",
        "writers": ["String"],
        "actors": ["String"],
        "length": "Number",
        "warType": "String",
        "imdbRating": {
            "userRating": "Number",
            "expertRating": "Number"
        },
        "expertRating": "Number",
        "language": ["String"],
        "country": ["String"],
        "media": {
            "imageUrl": "String",
            "trailerUrl": "String"
        }
    },
    users: {
        "id": "ObjectId",
        "adminName": "string",
        "password": "string"
    }

```

### Assigning of HTTP methods

```c
GET api/v1/warmovies  // Shows all warmovies
POST api/v1/warmovies  // Creates a new warmovie
GET api/v1/warmovies/:id  // Shows a specific warmovie
PUT api/v1/warmovies/:id  // Updates a specific warmovie
DELETE api/v1/warmovies/:id  // Deletes a specific warmovie
GET api/v1/users  // Shows all users when logged in as admin
POST api/v1/auth/register  // Creates a new user
POST api/v1/auth/login  // Logs in a user/admin

```



