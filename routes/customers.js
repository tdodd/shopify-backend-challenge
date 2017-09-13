const express = require('express');
const router = express.Router();

// Controllers
const customer = require('../controllers/CustomerController');
const validation = require('../controllers/ValidationController');


/**
 * GET / or /customers
 * 
 * Get all customers for page 1 and return invalid customers
 * 
 * @return {obj} the list of invalid customers
 */
router.get('/', function(req, res, next) {
   customer.findByPage()
      .then(customers => validation.validate(customers))
      .then(validatedCustomers => res.json(validatedCustomers))
      .catch((err) => res.json(err));
});
   
/**
 * GET /customers/{pageNumber}
 * 
 * Get all customers for this page and return invalid customers
 * 
 * @param {int} pageNumber the page to retreive
 * @return {obj} the list of invalid customers
 */
router.get('/:pageNumber', function (req, res, next) {
   customer.findByPage(req.params.pageNumber)
      .then(customers => validation.validate(customers))
      .then(validatedCustomers => res.json(validatedCustomers))
      .catch((err) => res.json(err));
});

module.exports = router;
