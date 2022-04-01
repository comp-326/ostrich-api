# Simple todo app setup with TS
This is my sample setup for the SOLID principles design architecture

Running project in dev mode
Install all the dependencies
```sh
$ yarn
```
Populate the `.env` with values from `.env.example` file

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

Navigate to `http://localhost:${PORT}/api/v1/docs`