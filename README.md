# Ostrich backend app
###  Ostrich app setup with TS
Check the instructions below to setup your environment

Running project in dev mode
Install all the dependencies
```sh
$ yarn
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
Run
```sh
$ yarn dev
```
The above script command should populate the `.env` from the `.env.example` snapshot properly.

Check the `.env` file and fill the empty fields
This will setup the project in the most convenient way for all devs workflow

Once done run:
```sh
$ yarn run dev:start
```

# Pre-Production
Run
```sh
$ yarn run dev:buildTs
```
This will build the typescript project to js
Then...
```sh
$ yarn start
```
# Dev-Endpoints docs
The deault port is `4001`
Navigate to `http://localhost:4001/api/v1/docs`
