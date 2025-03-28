# U05 - TopWarMovies

TopWarMovies is an API where 5 of my favourite war movies can be handled in different ways. The API is a REST API and is built with node express 

## Installation and usage

Download and install Node.js: https://nodejs.org/en/download/

Run these terminal commands to install the dependencies:
```bash
npm init -y # Create a package.json file
npm install bcryptjs@^3.0.2 cors@^2.8.5 dotenv@^16.4.7 express@^4.21.2 jsonwebtoken@^9.0.2 mongoose@^8.12.1 # Install  Express, Mongoose, bcryptjs, CORS, dotenv, jsonwebtoken
npm install --save-dev @types/cors@^2.8.17 @types/express@^5.0.0 @types/jsonwebtoken@^9.0.9 @types/node@^22.13.10 nodemon@^3.1.9 ts-node@^10.9.2 typescript@^5.8.2 # Install development dependencies for TypeScript, Node.ts, express, Nodemon, JWT Tokens and CORS
```
When testing the API, you can run these commands:
```bash
npm run dev # Run the development server
npm run build # Build the project with compiled TypeScript files
npm run start # Run the production server
```

Create an .env file and add the following environment variables:
```bash
PORT=Portnumber
MONGODB_URI=mongodb+srv://<db_username>:<db_password>@clustertest.zd7tc.mongodb.net/?retryWrites=true&w=majority&appName=<ClusterName>
JWT_SECRET=secretkey
ALLOWED_ORIGINS=URLs
```

If you don't have your own mongodb cluster, you can test the API on https://topwarmovies.onrender.com

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

### cURL Commands to interact with the API

```bash

# Show all warmovies:
#locally
curl -X GET http://localhost:3000/api/v1/warmovies
#remote:
curl -X GET https://topwarmovies.onrender.com/api/v1/warmovies

# Register a new user:
#locally
curl -X POST http://localhost:3000/api/v1/auth/register \
-H "Content-Type: application/json" \
-d '{
  "username": "newuser",
  "password": "yourPassword"
}'
#remote:
curl -X POST https://topwarmovies.onrender.com/api/v1/auth/register \
-H "Content-Type: application/json" \
-d '{
  "username": "newuser",
  "password": "yourPassword"
}'

# Log in a user or admin and get a JWT token:
#locally
curl -X POST http://localhost:3000/api/v1/auth/login \
-H "Content-Type: application/json" \
-d '{
  "username": "newuser",
  "password": "yourPassword"
}'
#remote:
curl -X POST https://topwarmovies.onrender.com/api/v1/auth/login \
-H "Content-Type: application/json" \
-d '{
  "username": "newuser",
  "password": "yourPassword"
}'

# Show a specific warmovie when logged in as user or admin (replace <movieId> with the actual movie ID):
#locally
curl -X GET http://localhost:3000/api/v1/warmovies/<movieId> \
-H "Authorization: Bearer <your-admin-token>"
#remote:
curl -X GET https://topwarmovies.onrender.com/api/v1/warmovies/<movieId> \
-H "Authorization: Bearer <your-admin-token>"

# Create a new warmovie when logged in as admin:
#locally
curl -X POST http://localhost:3000/api/v1/warmovies \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <your-admin-token>" \
-d '{
  "title": "Dunkirk","plot": "Allied soldiers from Belgium, the British Commonwealth and Empire, and France are surrounded by the German Army and evacuated during a fierce battle in World War II.",
  "releaseYear": 2017,"director": "Christopher Nolan","writers": ["Christopher Nolan"],
  "actors": ["Fionn Whitehead","Tom Hardy","Mark Rylance"],"length": "1h46m",
  "warType": "Second World War","imdbRating": {"userRating": 7.8,"expertRating": 9.4},
	"language": ["English","French","German"],"country": ["England","netherlands"],
	"media": {"imageUrl": "Not Specified","trailerUrl": "Not Specified"}
}'
#remote:
curl -X POST https://topwarmovies.onrender.com/api/v1/warmovies \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <your-admin-token>" \
-d '{
  "title": "Dunkirk","plot": "Allied soldiers from Belgium, the British Commonwealth and Empire, and France are surrounded by the German Army and evacuated during a fierce battle in World War II.",
  "releaseYear": 2018,"director": "Christopher Nolan","writers": ["Johnathan Nolan"],
  "actors": ["Fionn Whitehead","Tom Hardy","Mark Rylance"],"length": "1h46m",
  "warType": "Second World War","imdbRating": {"userRating": 7.8,"expertRating": 9.4},
	"language": ["English","French","German"],"country": ["England","netherlands"],
	"media": {"imageUrl": "Not Specified","trailerUrl": "Not Specified"}
}'

# Update a specific warmovie when logged in as admin (replace <movieId> with the actual movie ID):
#locally
curl -X PUT http://localhost:3000/api/v1/warmovies/<movieId> \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <your-admin-token>" \
-d '{
  "releaseYear": 2017,
  "writers": ["Christopher Nolan"],
}'
#remote:
curl -X PUT https://topwarmovies.onrender.com/api/v1/warmovies/<movieId> \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <your-admin-token>" \
-d '{
  "releaseYear": 2017,
  "writers": ["Christopher Nolan"],
}'

# Delete a specific warmovie when logged in as admin (replace <movieId> with the actual movie ID):
#locally
curl -X DELETE http://localhost:3000/api/v1/warmovies/<movieId> \
-H "Authorization: Bearer <your-admin-token>"
#remote:
curl -X DELETE https://topwarmovies.onrender.com/api/v1/warmovies/<movieId> \
-H "Authorization: Bearer <your-admin-token>"

# Show all users when logged in as admin (Requres admin token, replace <your-admin-token> with the actual admin token):
#locally
curl -X GET http://localhost:3000/api/v1/users \
-H "Authorization: Bearer <your-admin-token>"
#remote:
curl -X GET https://topwarmovies.onrender.com/api/v1/users \
-H "Authorization: Bearer <your-admin-token>"

# Delete a specific user when logged in as admin (Replace <userId> with the actual user ID):
#locally
curl -X DELETE http://localhost:3000/api/v1/users/<userId> \
-H "Authorization: Bearer <your-admin-token>"
#remote:
curl -X DELETE https://topwarmovies.onrender.com/api/v1/users/<userId> \
-H "Authorization: Bearer <your-admin-token>"

```

## Error handling

The API will return the following error codes with more specific error messages to resemble the theme of the API:

- 201: Created - Example: "Movie created successfully"
- 401: Unauthorized - Example: "Invalid username or password"
- 404: Not found - Example: "Movie not found"
- 500: Internal server error - Example: "Failed to update movie due to a server error"

---
