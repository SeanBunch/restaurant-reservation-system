# Restaurant Reservation System



## Existing files

Backend controllers and services to connect to, and query, PostgreSQL database via [Knex](http://knexjs.org/).

The table below describes the folders in this repository:

| Folder/file path | Description                                                      |
| ---------------- | ---------------------------------------------------------------- |
| `./back-end`     | The backend project, which runs on `localhost:5001` by default.  |
| `./front-end`    | The frontend project, which runs on `localhost:3000` by default. |


### Backend Existing files

The `./back-end` folder contains all the code for the backend project.

The table below describes the existing files in the `./back-end` folder:

| Folder/file path                                         | Description                                                                                                         |
| -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `./back-end/knexfile.js`                                 | The Knex configuration file.                                                                                        |
| `./back-end/src/app.js`                                  | Defines the Express application and connects routers.                                                               |
| `./back-end/src/db/connection.js`                        | The Knex connection file.                                                                                           |
| `./back-end/src/db/migrations`                           | The Knex migrations folder.                                                                                         |
| `./back-end/src/db/seeds/`                               | The Knex seeds folder.                                                                                              |
| `./back-end/src/errors/asyncErrorBoundary.js`            | Defines async error handler.                                                                                        |
| `./back-end/src/errors/errorHandler.js`                  | Defined an Express API error handler.                                                                               |
| `./back-end/src/errors/methodNotAllowed.js`              | Defines route error handler.                                                                                        |
| `./back-end/src/errors/notFound.js`                      | Defined an Express API "not found" handler.                                                                         |
| `./back-end/src/reservations/reservations.controller.js` | A controller for the reservations resource.                                                                         |
| `./back-end/src/reservations/reservations.router.js`     | A router for the reservations resource.                                                                             |
| `./back-end/src/reservations/reservations.server.js`     | A server for the reservations resource.                                                                             |
| `./back-end/src/tables/tables.controller.js`             | A controller for the tables resource.                                                                               |
| `./back-end/src/tables/tables.router.js`                 | A router for the tables resource.                                                                                   |
| `./back-end/src/tables/tables.server.js`                 | A server for the tables resource.                                                                                   |
| `./back-end/src/server.js`                               | Defines the node server.                                                                                            |
| `./back-end/test`                                        | A folder that contains all of the integration tests.                                                                |
| `./back-end/vercel.json`                                 | A vercel deployment configuration file.                                                                             |

### Frontend Existing files

The `./front-end` folder contains all the code for the frontend project.

The table below describes the existing files in the `./front-end` folder:

| Folder/file path                                   | Description                                                                                            |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `./front-end/e2e`                                  | Contains all of the end-to-end tests.                                                                  |
| `./front-end/jest-puppeteer.config.js`             | A configuration file used by the end-to-end tests.                                                     |
| `./front-end/src/App.js`                           | Defines the root application component.                                                                |
| `./front-end/src/App.test.js`                      | Contains the tests for the root application component.                                                 |
| `./front-end/src/dashboard/Dashboard.js`           | Defines the Dashboard page.                                                                            |
| `./front-end/src/index.js`                         | The main entry point for the React application.                                                        |
| `./front-end/src/layout/ErrorAlert.js`             | Defines an error alert component that display only when an error is specified.                         |
| `./front-end/src/layout/Layout.css`                | The css for the Layout component.                                                                      |
| `./front-end/src/layout/Layout.js`                 | Defines the main layout of the application.                                                            |
| `./front-end/src/layout/Menu.js`                   | Defines the menu for the application.                                                                  |
| `./front-end/src/layout/NotFound.js`               | Defines the "Not found" component that is displayed when no route matches.                             |
| `./front-end/src/layout/Routes.js`                 | Defines all the routes for the application.                                                            |
| `./front-end/src/utils/api.js`                     | Defines the functions used to access the backend API                                                   |
| `./front-end/src/utils/date-time.js`               | Defines functions to format date and time strings.                                                     |
| `./front-end/src/utils/format-reservation-date.js` | Defines a function to format the date on a single reservation or an array of reservations.             |
| `./front-end/src/utils/format-reservation-time.js` | Defines a function to format the time on a single reservation or an array of reservations.             |
| `./front-end/src/utils/useQuery.js`                | Defines a custom hook to parse the query parameters from the URL.                                      |

## Database setup

1. Four  ElephantSQL database instances - development, test, preview, and production 
1. DBeaver used to access database 

### Knex

Run `npx knex` commands from within the `back-end` folder, which is where the `knexfile.js` file is located.

## Installation

1. Fork and clone this repository.
1. Run `cp ./back-end/.env.sample ./back-end/.env`.
1. Update the `./back-end/.env` file with the connection URL's to your ElephantSQL database instance.
1. Run `cp ./front-end/.env.sample ./front-end/.env`.
1. You should not need to make changes to the `./front-end/.env` file unless you want to connect to a backend at a location other than `http://localhost:5001`.
1. Run `npm install` to install project dependencies.
1. Run `npm run start:dev` to start your server in development mode.

## Running tests

This project has unit, integration, and end-to-end (e2e) tests.

Test are split up by user story. You can run the tests for a given user story by running:

`npm run test:X` where `X` is the user story number.

Have a look at the following examples:

- `npm run test:1` runs all the tests for user story 1 (both frontend and backend).
- `npm run test:3:backend` runs only the backend tests for user story 3.
- `npm run test:3:frontend` runs only the frontend tests for user story 3.

Whenever possible, frontend tests will run before backend tests.

> **Note** When running `npm run test:X` If the frontend tests fail, the tests will stop before running the backend tests. Remember, you can always run `npm run test:X:backend` or `npm run test:X:frontend` to target a specific part of the application.

Since tests take time to run, you might want to consider running only the tests for the user story you're working on at any given time.

Run all the tests using the following commands:

- `npm test` runs _all_ tests.
- `npm run test:backend` runs _all_ backend tests.
- `npm run test:frontend` runs _all_ frontend tests.
- `npm run test:e2e` runs only the end-to-end tests.

If you would like a reminder of which npm scripts are available, run `npm run` to see a list of available commands.

Note that the logging level for the backend is set to `warn` when running tests and `info` otherwise.

> **Note**: After running `npm test`, `npm run test:X`, or `npm run test:e2e` you might see something like the following in the output: `[start:frontend] Assertion failed:`. This is not a failure, it is just the frontend project getting shutdown automatically.

> **Note**: If you are getting a `unable to resolve dependency tree` error when running the frontend tests, run the following command: `npm install --force --prefix front-end`. This will allow you to run the frontend tests.

> **Note**: If you stop the tests before they finish, it can leave the test database in an unusual state causing the tests to fail unexpectedly the next time you run them. If this happens, delete all tables in the test database, including the `knex_*` tables, and try the tests again.

### Frontend test timeout failure

Running the frontend tests on a resource constrained computer may result in timeout failures.

If you believe your implementation is correct, but needs a bit more time to finish, you can update the `testTimeout` value in `front-end/e2e/jest.config.js`. A value of 10000 or even 12000 will give each test a few more seconds to complete.

#### Screenshots

To help you better understand what might be happening during the end-to-end tests, screenshots are taken at various points in the test.

The screenshots are saved in `front-end/.screenshots` and you can review them after running the end-to-end tests.

You can use the screenshots to debug your code by rendering additional information on the screen.


