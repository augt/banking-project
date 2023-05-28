## Description

This is a simplified banking API, built with NestJS, TypeORM, postgreSQL and Docker.
You can quickly try the several features with the provided postman collection json file.

features :

- users can create and modify their user account.
- users can create one or several bank accounts.
- users can check their bank accounts' balance and last 30 money transactions history.
- users can generate transactions between their own accounts and also make payments to other users' accounts. Any transaction that would make a bank account's balance negative is forbidden by the API.
- users can block their bank account, specifying a timestamp that is up to 72h older than current time, in order to cancel all transactions made by this bank account within that time period. No new transaction can be made to and from a blocked bank account.

- intitutions can create an institution account and update it's name. when creating an account, the API generates a public ID and a secret key to allow for authentication.
- institutions can not create bank accounts but they can generate transactions between user's bank accounts.

- all routes except user account and institution account sign up/sign in are protected with authentication.

NB: since all bank accounts are created with a balance at 0€, and the API doesn't allow transactions that would make an account's balance less than 0€, in order to be able to make the first transaction though the API, you have to create a transaction directly though an SQL query in order to have at least one account with a positive balance.

## Installation

required software :

- NodeJS
- Docker

```bash
$ npm install
$ docker-compose up -d
$ npm run migration:run
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
