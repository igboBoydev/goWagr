### **About The Project**

This application is a simple backend server built with ExpressJS and PostgreSQL.
The application leverages various technical features including:
1. Caching
2. Logging (Local and third party[Beanstack])
3. API testing

### **How To Start The Application**

Use these for .env file

1. `PORT=`
2. `SECRET=`
3. `DB_USER=`
4. `SIGNATURES=`
5. `POSTGRES_PASSWORD=`
6. `DATABASE_URL=` e.g `postgres://pc@localhost:5432/gowagr`
7. `ENV_HOST=dev`
8. `REDIS_URL=`
9. `NODE_ENV=`


1. clone the application using `git clone https://github.com/igboBoydev/goWagr.git/`.
2. Run `npm install`.
3. Run `npx sequelize-cli db:create`.
4. Run `npm run migrate`.
5. Run `npm start`.



### **API Documentation**
