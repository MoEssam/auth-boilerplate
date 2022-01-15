# Authenitcation System Boilerplate

## Features

- Handles user registeration, logging in and logging out
- user is authenticated using JSON Web Token (JWT).

## Tech

The authentication system uses a number of open source projects to work properly:

- [ReactJS] - A JavaScript library for building user interfaces
- [node.js] - evented I/O for the backend
- [Express] - fast node.js network app framework
- [MongoDB] - The application data platform
- [JWT] - JSON Web Token

## Installation

Auth system requires [Node.js](https://nodejs.org/) v10+ to run.

Install the dependencies and devDependencies and start the server.

```sh
cd auth-boilerplate
npm i --dev
npm run install-dep
npm run dev
go to localhost:3000
```

## Features to be added soon

- [ ] Registration using social platforms ( Google, Facebook )
- [ ] Linking exsiting users to their social accounts
- [ ] Add profile photos
- [ ] Update profile details
- [ ] Admin functionality
- [x] Email Verification
- [ ] SMS Verification
- [ ] Forget password
- [ ] AWS cognito authentication
- [ ] Firebase authentication
