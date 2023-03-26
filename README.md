# Roboten Task

Resource Absence Management System

## Required Software

- [Git latest][git download]
- [Node.js 18.15.0][node download]
- [PostgreSQL 15.2][postgresql download]

## Resources

- [Documentation][docs]
- [Postman Workspace][postman workspace]


## Setting up local environment

1. Create an `.env` file in the `config` folder and add the `APP_ENV` environment variable to run the app in the desired environment. Check for possible environments in the `config.js` file.
2. Install dependencies
```bash
npm install
```
3. Start server
```bash
npm start
```

### Migrations

* Make migrations:

```
npx sequelize-cli migration:generate --name <name>
```

* Apply migrations to latest:

```
npx sequelize-cli db:migrate
```

* Revert migrations:

```
npx sequelize-cli db:migrate:undo
```

---


### Database

1. Use [pgAdmin4][pgadmin4 download] UI agent for management

### Run

---

### Testing

1. Go to pgAdmin4 and check that the server is running
2. Update the `APP_ENV` variable to `testing`
3. Run:

```
npm test
```

### Add new dependencies

1. Go to the root dir
2. Run `npm i <package>`, add `--save-dev` if the package will only be used in the development phase

 ---

[git download]: https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
[node download]: https://nodejs.org/en/download
[postgresql download]: https://www.postgresql.org/download/
[docs]: https://drive.google.com/drive/folders/1xfFouCBY8yX5xph-nDAJJOCItpgBK2Xa?ths=true
[postman workspace]: https://www.postman.com/comvo-api/workspace/roboten
[pgadmin4 download]: https://www.pgadmin.org/download/
