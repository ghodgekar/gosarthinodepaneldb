const db = require("../models");
const Ride = db.ride;
const Customer = db.customer;
const Driver = db.driver;

function validateDriverForm(payload) {
  let errors = {};
  let isFormValid = true;

  if (!payload || typeof payload.user_id !== 'string' || payload.user_id.trim().length === 0) {
    isFormValid = false;
    errors.user_id = 'Please provide user valid phone no.';
  }

  if (!payload || typeof payload.ostype !== 'string' || payload.ostype.trim().length === 0) {
    isFormValid = false;
    errors.ostype = 'Please provide Outstation Type.';
  }

  if (!payload || typeof payload.fueltype !== 'string' || payload.fueltype.trim().length === 0) {
    isFormValid = false;
    errors.fueltype = 'Please provide fuel type.';
  }

  if (!payload || typeof payload.triptype !== 'string' || payload.triptype.trim().length === 0) {
    isFormValid = false;
    errors.triptype = 'Please provide trip type.';
  }

  if (!payload || typeof payload.vehicle_type !== 'string' || payload.vehicle_type.trim().length === 0) {
    isFormValid = false;
    errors.vehicle_type = 'Please provide Vehicle type.';
  }

  if (!payload || typeof payload.vehicle_transmission !== 'string' || payload.vehicle_transmission.trim().length === 0) {
    isFormValid = false;
    errors.vehicle_transmission = 'Please provide vehicle transmission.';
  }

  if (!payload || typeof payload.car_no !== 'string' || payload.car_no.trim().length === 0) {
    isFormValid = false;
    errors.car_no = 'Please provide Car Number.';
  }

  if (!payload || typeof payload.pickupaddress !== 'string' || payload.pickupaddress.trim().length === 0) {
    isFormValid = false;
    errors.pickupaddress = 'Please provide Pickup Address.';
  }

  if (!payload || typeof payload.dropaddress !== 'string' || payload.dropaddress.trim().length === 0) {
    isFormValid = false;
    errors.dropaddress = 'Please provide Drop Address.';
  }

  // if (!payload || typeof payload.driver_id !== 'string' || payload.driver_id.trim().length === 0) {
  //   isFormValid = false;
  //   errors.driver_id = 'Please Assign Driver.';
  // }

  return {
      success: isFormValid,
      errors
  };
}

exports.rideSave = (req, res) => {
  const ride = new Ride(req.body);
  if (!ride) {
    return res.status(400).json({
        message: 'Form validation failed!',
        errors: 'Please Enter Valid Input'
    });
  }
  let validationResult = validateDriverForm(ride);
  if (!validationResult.success) {
    return res.status(400).json({
        message: 'Form validation failed!',
        errors: validationResult.errors
    });
  }
  ride.save((err, status) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }else {
      res.status(200).send({ message: "Ride Saved Successfully" });
      return;    
    }
  });
};

// exports.rideUpdate = (req, res) => {
//     Ride.updateOne({id:req.body.id},{$push: { name: req.body.name, child: {id : {$each:req.body.child.id, $position:0} , name: {$each:req.body.child.name, $position:0}} } },(err, status) => {
//     if (err) {
//       res.status(500).send({ message: err });
//       return;
//     }else{
//       res.status(200).send({ message: "Status Updated Successfully"  });
//       return;    
//     }
//   });
// };

exports.assignDriver = (req, res) => {
    Ride.updateOne({ride_id:req.body.ride_id},req.body,(err, status) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }else{
      res.status(200).send({ message: "Driver Assigned Successfully"  });
      return;    
    }
  });
};

exports.rideList = (req, res) => {
  let query;
  if(req.params.company_name === 'all'){
    query = {
      is_active: 1,
      status: req.params.status
    };
  }else{
    query = {
      is_active: 1,
      status: req.params.status,
      company_name:req.params.company_name
    };
  }
    Ride.find(query)
  .exec((err, ride) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send({ data:ride, message: "" });
  });
};


exports.rideSingleDetails = (req, res) => {
  Ride.findOne({
  is_active: 1,
  ride_id: req.params.ride_id,
  status: req.params.status
})
.exec((err, ride) => {
  if (err) {
    res.status(500).send({ message: err });
    return;
  }
  Customer.findOne({user_id:ride.user_id}).exec((err, user) => {
    Driver.findOne({driver_id:ride.driver_id}).exec((err, driver) => {
      res.status(200).send({ data:{ride:ride, customer:user, driver:driver}, message: "" });
    });
  });
});
};

exports.rideStatusUpdate = (req, res) => {
  let rideData = req.body;
  Ride.updateOne({ride_id:rideData.ride_id}, req.body ,(err, ride) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }else{
      if(req.body.status == 3){
        res.status(200).send({ message: "Ride Started Successfully"  });
        return;
      }
      if(req.body.status == 4){
        res.status(200).send({ message: "Driver Reached Pickup Address"  });
        return;
      }
      if(req.body.status == 5){
        res.status(200).send({ message: "Driver Reached Drop Address"  });
        return;
      }
      if(req.body.status == 6){
        res.status(200).send({ message: "Ride Payment Done Successfully"  });
        return;
      }
      if(req.body.status == 7){
        res.status(200).send({ message: "Ride Completed Successfully"  });
        return;
      }
      if(req.body.status == 8){
        res.status(200).send({ message: "Ride Cancelled Successfully"  });
        return;
      }
      
    }
  });
};

exports.rideOngoingList = (req, res) => {
  let query;
  if(req.params.company_name === 'all'){
    query = {
      is_active: 1,
      status: { $in: [3,4,5,6] }
    };
  }else{
    query = {
      is_active: 1,
      status: { $in: [3,4,5,6] } ,
      company_name:req.params.company_name
    };
  }
  Ride.find(query)
  .exec((err, ride) => {
  if (err) {
    res.status(500).send({ message: err });
    return;
  }
  res.status(200).send({ data:ride, message: "" });
});
};