# Personal Journaling App Backend

NestJs backend for a personal journaling application.Follow the instructions below to run the application on your machine.

## Getting Started

1. Switch to this folder in your terminal. `cd Backend`
2. Install `nvm` then `node` & `npm`: `brew install nvm && nvm install`
3. Install dependencies: `npm install`

## Environment Variables

Create a `.env` file with the following environment variables.

```
DB_HOST=[your postgres database host]
DB_PORT=[your postgres databse port]
DB_USERNAME=[your postgres database username]
DB_PASSWORD=[your postgres database password]
DB_DATABASE=journal
```

> [!NOTE]
> Postgres is the prefered database for this project bu that can be changed in the TypeORM configuration in the app module.

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
