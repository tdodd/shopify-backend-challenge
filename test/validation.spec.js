const should = require('chai').should();

// Controller being tested
const validation = require('../controllers/ValidationController');

describe('ValidationController', () => {

   describe('#validate', () => {

      // Array of valid customers
      const valid_customers = {
         validations: [
            { "name": { "required": true, "type": "string", "length": { "min": 5 } } },
            { "email": { "required": true } },
            { "age": { "type": "number", "required": false } },
            { "newsletter": { "required": true, "type": "boolean" } }
         ],
         customers: [
            { "id": 1, "name": "David", "email": "david@interview.com", "age": null, "country": "France", "newsletter": true },
            { "id": 2, "name": "Lilianne", "email": "lily@interview.com", "age": 24, "country": "China", "newsletter": false },
            { "id": 3, "name": "Bernardo", "email": "bernardo@interview.com", "country": "Brazil", "newsletter": false },
         ],
         pagination: { "current_page": 1, "per_page": 5, "total": 16 }
      };
      
      // Array of invalid customers
      const invalid_customers = {
         validations: [
            { "name": { "required": true, "type": "string", "length": { "min": 5 } } },
            { "email": { "required": true } },
            { "age": { "type": "number", "required": false } },
            { "newsletter": { "required": true, "type": "boolean" } }
         ],
         customers: [
            { "id": 1, "name": "David", "email": "david@interview.com", "age": null, "country": "France", "newsletter": true },
            { "id": 2, "name": "Lily", "email": "lily@interview.com", "age": 24, "country": "China", "newsletter": false },
            { "id": 3, "name": "Bernardo", "email": "bernardo@interview.com", "age": 30, "country": "Brazil", "newsletter": "false" },
         ],
         pagination: { "current_page": 1, "per_page": 5, "total": 16 }
      };

      it('should return an empty array if all customers are valid', () => {
         validation.validate(valid_customers).invalid_customers.length.should.equal(0);
         validation.validate(valid_customers).invalid_customers.should.be.empty;
      });
      
      it('should return the right customer id\'s for invalid customers', () => {
         const results = validation.validate(invalid_customers).invalid_customers;
         results[0].id.should.equal(2);
         results[1].id.should.equal(3);
      });
      
      it('should return the right invalid fields', () => {
         const results = validation.validate(invalid_customers).invalid_customers;
         results[0].invalid_fields[0].should.equal('name');
         results[1].invalid_fields[0].should.equal('newsletter');
         results[0].invalid_fields.length.should.equal(1);
         results[1].invalid_fields.length.should.equal(1);
      });

   });
   
   describe('#validateRequired', () => {

      it('should be true if required is empty', () => {
         validation.validateRequired('email@email.com', undefined).should.be.true;
         validation.validateRequired(5, undefined).should.be.true;
      });

      it('should be true for non-empty fields that are required', () => {
         validation.validateRequired('field', true).should.be.true;
         validation.validateRequired(20, true).should.be.true;
      });

      it('should be true for non-empty fields that are not required', () => {
         validation.validateRequired('email@email.com', false).should.be.true;
         validation.validateRequired(5, false).should.be.true;
      });
      
      it('should be true for empty fields that are not required', () => {
         validation.validateRequired(undefined, false).should.be.true;
      });
      
      it('should be false for empty fields that are required', () => {
         validation.validateRequired(undefined, true).should.be.false;
      });
      
   });

   describe('#validateType', () => {

      it('should be true for matching types', () => {
         validation.validateType('email@email.com', 'string').should.be.true;
         validation.validateType(5, 'number').should.be.true;
         validation.validateType(5.12345, 'number').should.be.true;
         validation.validateType(true, 'boolean').should.be.true;
      });

      it('should be false for non-matching types', () => {
         validation.validateType('email@email.com', 'number').should.be.false;
         validation.validateType(5, 'boolean').should.be.false;
         validation.validateType(5.12345, 'string').should.be.false;
      });

   });

   describe('#validateMin', () => {

      it('should be true for field lengths greater than min', () => {
         validation.validateMin('longfield', 5).should.be.true;
         validation.validateMin('exact', 5).should.be.true;
      });
      
      it('should be true for field lengths equal to min', () => {
         validation.validateMin('exact', 5).should.be.true;
      });

      it('should be false for field lengths less than min', () => {
         validation.validateMin('short', 10).should.be.false;
      });

   });

   describe('#validateMax', () => {
      
      it('should be true for field lengths less than max', () => {
         validation.validateMax('short', 10).should.be.true;
      });

      it('should be true for field lengths equal to max', () => {
         validation.validateMin('exact', 5).should.be.true;
      });

      it('should be false for field lengths greater than max', () => {
         validation.validateMax('waytoolong', 5).should.be.false;
      });

   });

});
