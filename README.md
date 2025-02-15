## NodeJS + Express + NoSql (mongoose)

# Start App
```js
npm i
npm run dev
```

# Create .env

The database is on a cluster, and you can directly access it from the local environment. Everything is already set up in the env file.

```js
NODE_ENV=development
MONGO=cluster
DATABASE=mongodb
MONGO_USER=nikola8311
MONGO_PASSWORD=ujkBoIgwQwAOtC7y
MONGO_PATH="@cluster0.0l1iv.mongodb.net/"
PORT=5000
API=/api/v1/
JWT_SECRET=skylead
```

# Database & API routes

The Postman collection is in the root folder (skylead.postman_collection.json).


## TODO 

create model for status
BE test