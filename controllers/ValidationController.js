const ValidationController = {

   /**
    * Perform validation checks on a list of customers
    *
    * @param {obj} body the JSON response received from the API call
    * @return {obj} a list of invalid customers
    */
   validate: (body) => {

      // List of invalid customers
      let validationErrors = {
         invalid_customers: []
      };

      // Loop through customers
      for (let i = 0; i < body.customers.length; i++) {

         // The current customer
         const customer = body.customers[i];

         // Invalid fields for the current customer
         let invalid_customer = {
            id: null,
            invalid_fields: [],
         };

         // Loop through validation rules for each customer
         for (let j = 0; j < body.validations.length; j++) {

            // Name of field being validated
            const field_name = Object.keys(body.validations[j])[0];

            // Value being validated
            const field_value = customer[field_name];
            
            // Validation rules
            const rules = body.validations[j][field_name];

            // Only invalidate a field once
            let flag = false;

            // Check if property is required
            if (!ValidationController.validateRequired(field_value, rules.required)) {
               flag = true;
               invalid_customer.id = customer.id;
               invalid_customer.invalid_fields.push(field_name);
            }
            
            // Check if property is the desired type
            if (rules.type && field_value) {
               
               if (!flag && !ValidationController.validateType(field_value, rules.type)) {
                  flag = true;
                  invalid_customer.id = customer.id;
                  invalid_customer.invalid_fields.push(field_name);
               }

            }
            
            if (rules.length) {
               
               // Check if property is too small
               if (rules.length.min) {
                  
                  if (!flag && !ValidationController.validateMin(field_value, rules.length.min)) {
                     flag = true;
                     invalid_customer.id = customer.id;
                     invalid_customer.invalid_fields.push(field_name);
                  }
                  
               }
               
               // Check if property is too large
               else if (rules.length.max) {
                  
                  if (!flag && !ValidationController.validateMax(field_value, rules.length.max)) {
                     flag = true;
                     invalid_customer.id = customer.id;
                     invalid_customer.invalid_fields.push(field_name);
                  }

               }

            }

            
         }
         
         // Add customer if there were validation errors
         if (invalid_customer.id) {
            validationErrors.invalid_customers.push(invalid_customer);
         }

      }

      return validationErrors;
      
   },

   /**
    * Check if a required field is present
    *
    * @param {string} field the field being validated
    * @param {bool} required set to true if the field is required
    * @return {bool} true if the field is valid and false otherwise
    */
   validateRequired: function(field, required) {
      if (required === true) return field != null;
      return true;
   },

   /**
    * Check if a field is of valid type
    *
    * @param {string} field the field being validated
    * @param {string} type the expected type for this field
    * @return {bool} true if the field is valid and false otherwise
    */
   validateType: (field, type) => {
      return typeof(field) === type
   },

   /**
    * Check if a field is at least the minimum required length
    *
    * @param {string} field the field being validated
    * @param {int} min the minimum required length for this field
    * @return {bool} true if the field is of valid length and false otherwise
    */
   validateMin: (field, min) => {
      return field.length >= min;
   },
      
   /**
    * Check if a field is less than the maximum specified length
    *
    * @param {string} field the field being validated
    * @param {int} max the maximum length allowed for this field
    * @return {bool} true if the field is of valid length and false otherwise
    */
   validateMax: (field, max) => {
       return field.length <= max;
   },
   
}

module.exports = ValidationController;