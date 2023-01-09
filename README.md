# Oncase Fullstack Challenge

## 🔧 Pre-requisites

Before running the project, you must have the following tools installed on your machine: 
* [Git](https://git-scm.com/book/pt-br/v2/Come%C3%A7ando-Instalando-o-Git)
* [Node.js](https://nodejs.org/pt-br/download/package-manager/) 
* [Docker](https://www.docker.com/)
* NPM or Yarn

Also, you will need to clone the repository:

```bash
## Cloning the repository
git clone https://github.com/mateuseap/Oncase-Challenge

## Entering the directory
cd Oncase-Challenge
```

## 🚀 Back-end

```bash
## Entering the directory
cd back-end
```

### > Setting the environment variables

Create a file named ``.env`` and copy and past in it what is inside the ``.env.example`` file.

### > Docker image setup

To create and run a ``Postgres`` docker image and also start a database, open up a terminal and run the following command: 

```docker
# Run the docker image of postgres
docker run --name dashboard -e POSTGRES_PASSWORD=docker -e POSTGRES_DB=dashboard -e POSTGRES_USER=postgres -p 5432:5432 -d postgres
```

> If you already have a ``Postgres`` image or driver on your PC, simply create a new database:
~~~~sql
  CREATE DATABASE "dashboard";
~~~~

### > Running the migrations

You have to build the application before running the migrations:

```bash
# Installing the dependencies
npm install

# Building the application
npm run build
```

To run the migrations:
```bash
# Running the migration
npm run typeorm:run-migrations
```

### > Running the app


```bash
# Development
npm run start

# Watch mode
npm run start:dev

# Production mode
npm run start:prod
```

Open [http://localhost:3000/dashboard/api/swagger](http://localhost:3000/dashboard/api/swagger) to vsualize the ``Swagger`` of this project in your browser. There you can test all the endpoints of the API without needing softwares like ``Postman`` and ``Insomnia``

![swagger](https://i.imgur.com/rZR7qmt.png)

### > Resetting the database

To reset the database, you'll need to run the following command:

```bash
# Resetting the database
npm run typeorm:schema-drop
```

After running it, you'll just need to run the back-end app again and the database will be already reseted.

### > Running tests

```bash
# Controllers unit tests
npm run test:controlles
```

You should receive an output like this:

![controllers-unit-tests](https://i.imgur.com/xf9jWoP.png)

## 🚀 Front-end

```bash
## Entering the directory
cd ..
cd front-end
```

### > Setting the environment variables

Create a file named ``.env`` and copy and past in it what is inside the ``.env.example`` file.

### > Running the app

```bash
## Installing the npm dependencies
npm install

## Starting the project (development environment)
npm start
```

Open [http://localhost:3001](http://localhost:3001) to view it in the browser.

