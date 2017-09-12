const request = require('request');
const Promise = require('bluebird');


const CustomerController = {

   /**
    * Get all customers on a specific page. Defaults to 1 if no page is specified.
    *
    * @param {int} pageNumber the page of customers to retreive
    * @return {Promise} an object containing the customers
    */
   findByPage: function(pageNumber=1) {

      return new Promise((resolve, reject) => {

         // The customer API endpoint
         const endpoint = 'https://backend-challenge-winter-2017.herokuapp.com/customers.json?page=' + pageNumber;

         // Send the request
         request(endpoint, (error, response, body) => {
            if (error) reject(error); // Error occurred
            else resolve(JSON.parse(body));
         });

      });

   }, // end findByPage()

};

module.exports = CustomerController;