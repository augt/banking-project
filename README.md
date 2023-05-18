## Description

This is a simplified banking API, built with NestJS, TypeORM, postgreSQL and Docker.
You can quickly try the several features with the provided postman collection json file.

features :

- all routes except user account and institution account sign up/sign in are protected with authentication.

- users can create and modify their user account.
- users can create one or several bank accounts.
- users can check their bank accounts' balance and last 30 money transactions history.
- users can generate transactions between their own accounts and also make payments to other users' accounts. Any transaction that would make a bank account's balance negative is forbidden by the API.
- users can block their bank account, specifying a timestamp that is up to 72h older than current time, in order to cancel all transactions made by this bank account within that time period. no new transaction can be made to and from a blocked bank account.

- intitutions can create an institution account and update it's name. when creating an account, the API generates a public ID and a secret key to allow for authentication.
- institutions can not create bank accounts but they can generate transactions between user's bank accounts.

## Installation

require software :

- nodeJS
- docker

```bash
$ npm install
$ docker-compose up -d
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
