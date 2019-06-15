# PSP - Payment Service Provider

The application is a simple example of transactions and payables

### Installation

PSP requires [Node.js](https://nodejs.org/) v8+ to run and [PostgreSQL](https://www.postgresql.org/download/)

Install the dependencies and devDependencies and start the server.

```sh
$ git clone https://github.com/brunoflegler/api-pay-transactions.git
$ cd api-pay-transactions
```

Installation is done using the npm install command:

```sh
$ npm install
```

Or run Yarn install command:

```sh
$ yarn install
```

### Migrations

To run the test suite, first install the dependencies, and configure .env.test and run migrations

```sh
$ sequelize db:migrate
```

### Test

To run the test suite, first install the dependencies, and configure .env.test, migrations and run npm test:

```sh
$ npm test
```

Or run Yarn:

```sh
$ yarn test
```

### Run development

To run, first install the dependencies, and configure .env, migrations and run npm test:

Run NPM development:

```sh
$ npm run dev
```

Or run Yarn development:

```sh
$ yarn dev
```

### Run production

To run, first install the dependencies, and configure .env, migrations and run npm test:

Run Pm2 development:

```sh
$ pm2 start ecosystem.config.js --env production
```

### Documentation

Follow our use guide for more information. [http://psp.myhobbies.com.br](http://psp.myhobbies.com.br).
