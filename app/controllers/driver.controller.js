const db = require("../models");
const VALIDATOR = require('validator');
const path = require('path');
const Driver = db.driver;
const DriverHistory = db.driver_history;
const DriverDocument = db.driver_document;

function validateDriverForm(payload) {
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

  if (!payload || !VALIDATOR.isMobilePhone(payload.phone,'en-IN') || payload.phone.trim().length === 0) {
    isFormValid = false;
    errors.phone = 'Please provide Valid phone number.';
  }

  if (!payload || !VALIDATOR.isMobilePhone(payload.alt_phone,'en-IN') || payload.alt_phone.trim().length === 0) {
    isFormValid = false;
    errors.alt_phone = 'Please provide Valid alternate phone number.';
  }

  if (!payload || typeof payload.gender !== 'string' || payload.gender.trim().length === 0) {
    isFormValid = false;
    errors.gender = 'Please provide gender.';
  }

  if (!payload || payload.dob.trim().length === 0) {
    isFormValid = false;
    errors.dob = 'Please provide dob.';
  }

  if (!payload || typeof payload.state !== 'string' || payload.state.trim().length === 0) {
    isFormValid = false;
    errors.state = 'Please provide state.';
  }

  if (!payload || typeof payload.city !== 'string' || payload.city.trim().length === 0) {
    isFormValid = false;
    errors.city = 'Please provide city.';
  }

  if (!payload || !VALIDATOR.isPostalCode(payload.pincode,'IN') || payload.pincode.trim().length === 0) {
    isFormValid = false;
    errors.pincode = 'Please provide Valid pincode.';
  }

  if (!payload || typeof payload.address !== 'string' || payload.address.trim().length === 0) {
    isFormValid = false;
    errors.address = 'Please provide address.';
  }

  if (!payload || typeof payload.device_type !== 'string' || payload.device_type.trim().length === 0) {
    isFormValid = false;
    errors.device_type = 'Please provide device type.';
  }

  return {
      success: isFormValid,
      errors
  };
}

exports.driverSave = (req, res) => {
    let driverData = req.body;
    if (!driverData) {
        return res.status(400).json({
            message: 'Form validation failed!',
            errors: 'Please Enter Valid Input'
        });
    }
    let validationResult = validateDriverForm(driverData);
    if (!validationResult.success) {
        return res.status(400).json({
            message: 'Form validation failed!',
            errors: validationResult.errors
        });
    }
    const driver = new Driver(driverData);
    driver.save((err, driver) => {
        if (err) {
        res.status(500).send({ message: err });
        return;
        }else {
        res.status(200).send({ message: "Driver Saved Successfully" });
        return;    
        }
    });
};

exports.driverUpdate = (req, res) => {
  let driverData = req.body;
  let validationResult = validateDriverForm(driverData);
  if (!validationResult.success) {
      return res.status(400).json({
          message: 'Form validation failed!',
          errors: validationResult.errors
      });
  }
  Driver.findByIdAndUpdate({_id:driverData.id},driverData, { new: true },(err, driver) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }else{
      res.status(200).send({ message: "Driver Updated Successfully"  });
      return;
    }
  });
};

exports.driverList = (req, res) => {
    Driver.find({
    is_active: 1,
    status: req.params.status
  })
  .exec((err, driver) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send({ data:driver, message: "" });
  });
};

exports.singleDriver = (req, res) => {
    Driver.find({
    is_active: 1,
    driver_id: req.params.driver_id
  })
  .exec((err, driver) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send({ data:driver, message: "" });
  });
};

exports.driverDocSave = (req, res, next) => {
  let dest = path.resolve('uploads/driver/');
  const file = req.files['document_img'];
  const filename = req.body.document_name+'_'+req.body.driver_id+'.png';
  file.mv(dest + "/" + req.body.document_name + "/" + filename, (err) => {
    if (err) {
        return res.status(500).send({ message: err, code: 200 });
    }
    //let driverDocData = {'driver_id':req.body.driver_id,'document_no':req.body.document_no,'document_name':req.body.document_name,'document_path':filename};
    // const driverdoc = new DriverDocument(driverDocData);
    // driverdoc.save((err, driverdoc) => {
    //   if (err) {
    //     res.status(500).send({ message: err });
    //     return;
    //   }else {
    //     res.status(200).send({ message: "Driver Document Saved Successfully" });
    //     return;    
    //   }
    // });
    DriverDocument.updateOne({
      $and: [
        { driver_id: req.body.driver_id },
        { document_name: req.body.document_name }
      ]
    },
    {      
      $set: {'driver_id':req.body.driver_id,'document_no':req.body.document_no,'document_name':req.body.document_name,'document_path':filename}
    },{ upsert: true },(err, driver) => {
      if (err) {
        res.status(500).send({ message: err.message });
        return;
      }else{
        res.status(200).send({ message: "Driver Document Saved Successfully"  });
        return;
      }
    })
  });
};

exports.driverDocList = (req, res) => {
  DriverDocument.find({
    is_active: 1,
    driver_id: req.params.driver_id
  })
  .exec((err, driver) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send({ data:driver, message: "" });
  });
};

exports.driverStatusUpdate = (req, res) => {
  let driverData = req.body;
  Driver.updateOne({driver_id:driverData.driver_id}, {status:driverData.status, reject_reason:driverData.reject_reason},(err, driver) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }else{
      res.status(200).send({ message: "Driver Status Chnaged Successfully"  });
      return;
    }
  });
};

exports.driverDocImage = (req, res) => {
  return res.sendFile(req.query.imgpath, { root: '.' })
};

exports.driverApproveReject = (req, res) => {
  let driverData = req.body;
  Driver.updateOne({driver_id:driverData.driver_id}, req.body ,(err, driver) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }else{
      if(req.body.status === 1){
        res.status(200).send({ message: "Driver Rejected"  });
        return;
      }
      if(req.body.status === 3){
        res.status(200).send({ message: "Driver Approved Successfully"  });
        return;
      }
    }
  });
};

exports.driverHistorySave = (req, res) => {
  let driverData = req.body;
  const driverhistory = new DriverHistory({driver_id: driverData.driver_id, action: driverData.action, remark: driverData.remark, reason: driverData.reason });
  driverhistory.save((err, driver) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }else {
        Driver.updateOne({driver_id:driverData.driver_id}, {status:driverData.driverhistorystatus},(err, drivers) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }else{
            if(driverData.driverhistorystatus === '3'){
              res.status(200).send({ message: "Driver Activated Successfully" });
              return;   
            }
            if(driverData.driverhistorystatus === '4'){
              res.status(200).send({ message: "Driver Deactivated Successfully" });
              return;   
            } ;
            // res.status(200).send({ data: drivers });
          }
        });
        
      }
  });
};

exports.driverHistoryList = (req, res) => {
  DriverHistory.find({
    driver_id: req.params.driver_id
  })
  .exec((err, driver) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send({ data:driver, message: "" });
  });
};