<h1 align="center"><project-name></h1>

<p align="center"><project-description></p>
 

<h3 align="left">Languages and Tools:</h3>
<p align="left"> <a href="https://www.docker.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/docker/docker-original-wordmark.svg" alt="docker" width="40" height="40"/> </a> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a> <a href="https://www.mongodb.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg" alt="mongodb" width="40" height="40"/> </a> <a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a> </p>


  
## Links

- [Backend for NFT marketplace](https://github.com/Mejdi97/Backend/<project-name> "<project-name>")
  
  ## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_URL`
`URL`
`MY_EMAIL`
`MY_PASS`
  
  

## Available Commands

In the project directory, you can run:

### npm install" : "npm install express": "npm dev start",

The app is built using JavaScript. Open [http://localhost:3001](http://localhost:3001) to test APIs with POSTMAN. You also need to run the server file as well to completely run the app. The page will reload if you make edits.
You will also see any lint errors in the console.

### "npm run build":,

Builds the app for production to the build folder. It correctly bundles React in production mode and optimizes the build for the best performance. The build is minified and the filenames include the hashes. Your app will be ready to deploy!

### "npm run test":,

Launches the test runner in the interactive watch mode.

### "npm run dev": "concurrently "nodemon server" "npm run start",

For running the server and app together I am using concurrently this helps a lot in the MERN application as it runs both the server (client and server) concurrently. So you can work on them both together.

### "serve": "node server"

For running the server file on you can use this command.

## SWAGGER DOCUMENTATION
  
  ## Documentation

[Documentation](https://swagger.io/docs/specification/basic-structure/)
  
  
  Use [http://localhost:3001/api-docs/#/](http://localhost:3001/api-docs/#/) to use principle endpoints for this project.
  
## Exemple

#### update a custumer

```http
  PUT /customers/${id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `jwt_tok` | `string` | **Required**. for put req  |

#### Get asset

```http
  GET /assets/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |




## Run Backend As a container

```
docker build --tag node-docker .
```

```http
 docker run node-docker
```

