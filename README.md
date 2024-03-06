# Restaurant Reservation System


## Project is hosted on Render [HERE](https://resaurant-reservation-system-front-end.onrender.com). 
### *Initial loading of data can take up to 1 minute due to free Render account.  

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
| `./front-end/src/dashboard/ChangeDate.js`          | Defines the change date component that changes the dashboroard date.                                   |
| `./front-end/src/dashboard/Dashboard.js`           | Defines the Dashboard page.                                                                            |
| `./front-end/src/index.js`                         | The main entry point for the React application.                                                        |
| `./front-end/src/layout/ErrorAlert.js`             | Defines an error alert component that display only when an error is specified.                         |
| `./front-end/src/layout/Layout.css`                | The css for the Layout component.                                                                      |
| `./front-end/src/layout/Layout.js`                 | Defines the main layout of the application.                                                            |
| `./front-end/src/layout/Menu.js`                   | Defines the menu for the application.                                                                  |
| `./front-end/src/layout/NotFound.js`               | Defines the "Not found" component that is displayed when no route matches.                             |
| `./front-end/src/layout/Routes.js`                 | Defines all the routes for the application.                                                            |
| `./front-end/src/reservations/EditReservations.js` | Defines all the routes for the application.                                                            |
| `./front-end/src/utils/api.js`                     | Defines the functions used to access the backend API                                                   |
| `./front-end/src/utils/date-time.js`               | Defines functions to format date and time strings.                                                     |
| `./front-end/src/utils/format-reservation-date.js` | Defines a function to format the date on a single reservation or an array of reservations.             |
| `./front-end/src/utils/format-reservation-time.js` | Defines a function to format the time on a single reservation or an array of reservations.             |
| `./front-end/src/utils/useQuery.js`                | Defines a custom hook to parse the query parameters from the URL.                                      |

## Database setup

1. Four  ElephantSQL database instances - development, test, preview, and production 
1. DBeaver used to access database 