# Interview Scheduler

A single page app that allows the user to book, delete and update appointments. Data is persisted by the API server using a PostgreSQL database. Spots available for each day are visible and update as appointments are booked. Jest and Cypress tests have been included in the project to check functionality.  

## Final Product
![adding appointments](https://github.com/licorm/scheduler/blob/master/docs/Create-Appointment.gif?raw=true)
![deleting appointments](https://github.com/licorm/scheduler/blob/master/docs/Delete-Appointment.gif?raw=true)
![editing appointments](https://github.com/licorm/scheduler/blob/master/docs/Edit-Appointment.gif?raw=true)

## Dependencies

- axios: ^0.21.4,
- classnames: ^2.2.6,
- normalize.css: ^8.0.1,
- react: ^16.9.0,
- react-dom: ^16.9.0,
- react-scripts: 3.0.0

## Dev Dependencies

- @babel/core: ^7.4.3,
- @storybook/addon-actions: ^5.0.10,
- @storybook/addon-backgrounds: ^5.0.10,
- @storybook/addon-links: ^5.0.10,
- @storybook/addons: ^5.0.10,
- @storybook/react: ^5.0.10,
- @testing-library/jest-dom: ^4.0.0,
- @testing-library/react: ^8.0.7,
- @testing-library/react-hooks: ^7.0.2,
- babel-loader: ^8.0.5,
- node-sass: ^4.14.0,
- prop-types: ^15.7.2,
- react-test-renderer: ^16.9.0

## Setup

-Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## API Setup

In the scheduler-api repo, install dependencies with `npm install`.

### Creating The DB

- Run `psql -U development` on your vagrant machine and log in with username `development` and password `development`.
- Create the database with command `CREATE DATABASE scheduler_development;`.
- Add the following code to your `.env.development` file.
```
PGHOST=localhost
PGUSER=development
PGDATABASE=scheduler_development
PGPASSWORD=development
PGPORT=5432
```

### Seed The DB

- Run the server using `npm start` in Host terminal.
- Make a `GET` request to `/api/debug/reset` with `curl http://localhost:8001/api/debug/reset`.

### Run The Server

Running the server normally
```sh
npm start
```

Running the server so it returns an error when saving/deleting for testing the client's error handling capabilities
```sh
npm run error
```

## Stack
-ReactJS
-Storybook
-Cypress
-Jest
-HTML
-Javascript
-PostgreSQL
-SASS
