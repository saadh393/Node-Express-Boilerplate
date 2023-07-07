# Node Express Boilerplate

This is an open-source project. I simply created a boilerplate code to accelerate the setup of your starter project. To simplify matters, I have implemented an Authentication system, saving you the time and effort of writing repetitive code and logic for each node.js project. You are welcome to contribute and enhance this project, making it more robust and user-friendly.

## Features

- **Express** for handling requests
- **Prisma.js** for communicating with MongoDB
- **Axios** for featching data from other servers
- **Helmet** for securing the header
- **Joi** for Validating the request body
- **Json Web Token** for maintaining request token

## Project Structure

All the files and folders are inside the `src` directory. I will explain the purpose of each folder one by one.

- `index.js` - Staring point of the server. `npm start` will execute this file and it will start the server, and end all the connections while closing the server.

- `app.js` - In this file we will handle all the Express.js staff, the middlewares, routing, cors, error handling, securing http headers and so on.

- `src/routers/` - This folder contains the route mapping for the entire application. By exploring the `src/routers/index.js` file, you can easily comprehend the entire routing system. Additionally, it's important to adhere to the file naming convention. Each sub-route should have a `.route.js` extension appended to the file name.

- `src/validator/` - This validates the request with the help of `Joi` library. We have to define the expected parameters and types of request body here to validate.

- `src/controllers` - This folder will manage to accept the request and send back to the request. In the middle of that it will collect data from various needed services

- `src/services` - Here we will write our business logic. Either we login, register or refresh token this type of services will be written in here

- `src/prisma` - This works as the driver between Database and Express.js. If `Services` needs any of the database services it will connect to the `prisma` query written under `prisma` directory with `filename.prisma.js`. But at the very beginning you have to declare the schema of database in `schema.prisma` file. How to configure the database and prisma schema is written [here](https://hashnode.com/post/clj8w2j15000j09l75tpeb7io)

- `src/middleware` - In this folder, you will find various middlewares. Currently, I have created two middlewares: `validator` and `auth`. The `validator` middleware ensures that every request adheres to the expected body format. On the other hand, the `auth` middleware authenticates each route, verifying that the user is authorized to access the page.
