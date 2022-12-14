# Ostrich backend app
###  Ostrich app setup with TS
Check the instructions below to setup your environment

Running project in dev mode
Install all the dependencies
```sh
$ npm install
```
#####
App domains
1. [x] Users
1. [x] Availability
1. [x] Services
1. [x] Folders
1. [x] Roles
1. [x] Appointments
1. [x] Workspace
# Running the project
To set environment variables
Make sure to run this before you start development otherwise
the server won't start properly
```sh
$ npm run env
```
The above script command should populate the `.env` from the `.env.example` snapshot properly.

Check the `.env` file and fill the empty fields
This will setup the project in the most convenient way for all devs workflow

After configuring the environment variables run the following to migrate all the app permission schemes
i.e User roles and Workspace roles
```sh
$ migrate:dev:roles
# OR
$ migrate:dev:roles
```
This is to run the development server
```sh
$ npm run dev
```
# Dev-Endpoints docs
To access the API docs head over to the `url` below
The deault port is `6200`
Navigate to 

`http://localhost:6200`
# Pre-Production
This is a pre-deployment script
Run
```sh
$ npm run build
```
This will build the typescript project to js
After building run the following to migrate all the app permission schemes
i.e User roles and Workspace roles
```sh
$ migrate:prod:roles
# OR
$ migrate:prod:roles
```
Then...
```sh
$ npm start
```

