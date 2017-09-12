## Shopify Backend Intern Challenge - Winter 2017

By Thomas Dodd

This solution was acheived using [Node](https://nodejs.org) and [Express](https://expressjs.com/). Unit tests are written using [Mocha](https://mochajs.org/) and [Chai](http://chaijs.com/).

#### You must have [Node.js](https://nodejs.org) installed on your machine
Clone the project: `git clone https://github.com/tdodd/shopify-backend-challenge.git`
+ `cd` into the project directory
+ Install dependencies with `npm install`.

Once this is complete, you can start the application via `npm start` and run tests via `npm test`.

The application architecture is as follows:
+ The client sends a request to `/customers/{pageNumber}`
+ The router receives this request and uses 2 controllers to perform jobs
   + `CustomerController` get the list of customers from the API
   + `ValidationController` performs the validation on the customers that were retreived
+ The router then sends the invalid clients as a JSON object to the client

Sample response:
```javascript
{
  "invalid_customers": [
    { "id": 1, "invalid_fields": ["name", "age"] },
    { "id": 3, "invalid_fields": ["password"] }
  ]
}
```