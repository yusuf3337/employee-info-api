### To Start the DB.

`make db-start`

### To Initialize the DB

`make db-init`

### To Delete the DB

`make db-wipe`

### To Start API

`npm start`

### To Start API and Watch Changes

`npm run dev`

## CRUD operations convention

| Contex             | Controller | Action | Query Function |
| ------------------ | ---------- | ------ | -------------- |
| Creating Something | post       | create | insert         |
| Reading Some Data  | get        | fetch  | select         |
| Update Some Data   | put        | modify | update         |
| Deleting Some Data | delete     | remove | delete         |

[CyprusCodes.com](http://www.cypruscodes.com)

## Employee and payroll API

1. Run `xx fresh` for a fresh local database. Xest loads
   `database/database-schema.sql`, applies the migration that creates the three
   payroll tables, then loads `database/seed-data.sql`. For an existing
   installation, run `npm run migrate-up:all`.
2. Configure the database and JWT settings in `.env`, then run `npm start`.
3. Import `postman/employee-info-api.postman_collection.json` into Postman.
   Set `baseUrl` if the API does not run at `http://localhost:3001`. Run the
   login request first; it saves the JWT token automatically.

All `/employees`, `/salaries`, and `/transfers` endpoints require an admin JWT.
Each resource supports `GET /`, `GET /:id`, `POST /`, `PUT /:id`, and
`DELETE /:id`. `PUT` replaces all editable fields. Salary and transfer lists
also accept `?employeeId=1`.

Employees hold contact and employment details. Salaries hold gross amount,
currency, and effective date. Transfers are **records of payments** linked to a
salary; the API does not send money. Amounts are decimal strings with two or
fewer decimal places. Delete transfer records before salaries, and salaries
before employees. The database rejects deletion while related records exist.
