const chaiAsPromised = require("chai-as-promised");
const chai = require("chai").use(chaiAsPromised);
const should = chai.should;


// Controller being tested
const customer = require('../controllers/CustomerController');

describe('CustomerController', () => {

   describe('#findByPage', (done) => {

      it('should have a validations property', (done) => {
         customer.findByPage()
            .should.eventually.have.property('validations')
            .notify(done);
      });
      
      it('should have a customers property', (done) => {
         customer.findByPage()
            .should.eventually.have.property('customers')
            .notify(done);
      });
      
      it('should have a pagination property', (done) => {
         customer.findByPage()
            .should.eventually.have.property('pagination')
            .notify(done);
      });

      it('should get page 1 for empty pageNumber', (done) => {
         customer.findByPage()
            .then(body => {
               body.pagination.current_page.should.equal(1);
               done();
            });
      });

      it('should get the right page for numbers greater than 1', (done) => {
         customer.findByPage(2)
            .then(body => {
               body.pagination.current_page.should.equal(2);
               done();
            });
      });

   });

});
