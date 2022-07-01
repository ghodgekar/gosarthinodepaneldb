const db = require("../models");
const VALIDATOR = require('validator');
const Customer = db.customer;

function validateCustomerForm(payload) {
  let errors = {};
  let isFormValid = true;

  if (!payload || typeof payload.name !== 'string' || payload.name.trim().length === 0) {
    isFormValid = false;
    errors.name = 'Please provide name.';
  }

  if (!payload || typeof payload.email !== 'string' || payload.email.trim().length === 0 || !VALIDATOR.isEmail(payload.email)) {
    isFormValid = false;
    errors.email = 'Please provide Valid email.';
  }

  if (!VALIDATOR.isMobilePhone(payload.phone,'en-IN')) {
    isFormValid = false;
    errors.phone = 'Please provide Valid phone number.';
  }

  if (!payload || typeof payload.gender !== 'string' || payload.gender.trim().length === 0) {
    isFormValid = false;
    errors.gender = 'Please provide gender.';
  }

  if (!payload || typeof payload.state !== 'string' || payload.state.trim().length === 0) {
    isFormValid = false;
    errors.state = 'Please provide state.';
  }

  if (!payload || typeof payload.city !== 'string' || payload.city.trim().length === 0) {
    isFormValid = false;
    errors.city = 'Please provide city.';
  }

  if (!VALIDATOR.isPostalCode(payload.pincode,'IN')) {
    isFormValid = false;
    errors.pincode = 'Please provide Valid pincode.';
  }

  if (!payload || typeof payload.address !== 'string' || payload.address.trim().length === 0) {
    isFormValid = false;
    errors.address = 'Please provide address.';
  }

  return {
      success: isFormValid,
      errors
  };
}

exports.customerSave = (req, res) => {
  let customerData = req.body;
  let validationResult = validateCustomerForm(customerData);
  if (!validationResult.success) {
      return res.status(400).json({
          message: 'Form validation failed!',
          errors: validationResult.errors
      });
  }
  const customer = new Customer(customerData);
  customer.save((err, customer) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }else {
      res.status(200).send({ message: "Customer Saved Successfully" });
      return;    
    }
  });
};

exports.customerUpdate = (req, res) => {
  let customerData = req.body;
  let validationResult = validateCustomerForm(customerData);
  if (!validationResult.success) {
      return res.status(400).json({
          message: 'Form validation failed!',
          errors: validationResult.errors
      });
  }
  Customer.findByIdAndUpdate({_id:customerData.id},customerData, { new: true },(err, customer) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }else{
      res.status(200).send({ message: "Customer Updated Successfully"  });
      return;
    }
  });
};

exports.customerList = (req, res) => {
  let query;
    if(req.params.company_name === 'all'){
      query = {
        is_active: 1
      };
    }else{
      query = {
        is_active: 1,
        company_name:req.params.company_name
      };
    }
    Customer.find(query)
  .exec((err, customer) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send({ data:customer, message: "" });
  });
};

exports.customerByPhone = (req, res) => {
    Customer.find({
    is_active: 1,
    phone:req.params.phone,
    partner_id:req.params.partner_id
  })
  .exec((err, customer) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if(customer){
      res.status(200).send({ data:customer, message: "" });
    }else{
      res.status(200).send({ message: "No Data Avaiable" });
    }
    
  });
};