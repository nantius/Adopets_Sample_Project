# Adopets_Sample_Project

## Setup
* yarn 
* docker run --name adopets --network adopets -p 5432:5432 -e POSTGRES_USER=adopets -e POSTGRES_PASSWORD=adopets -e POSTGRES_DB=adopets -d postgres
* docker run --name redis_adopets --network adopets -p 6379:6379 -d -t redis:alpine
* yarn typeorm migration:run
* yarn dev:server

## Testing
* yarn test

## Routes

--> Public Routes <--

-> Authentication
* POST /login
* DEL  /logout

-> SignUp
* POST /users

--> Authenticated Routes <--

-> Products
* GET  /products
* DEL  /products/:uuid
* PUT  /products/:uuid
* POST /products

-> User Logs
* GET /userlogs

-> Error Logs
* GET /errors
