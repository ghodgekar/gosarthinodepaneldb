const db = require("../models");
const VALIDATOR = require('validator');
const path = require('path');
const Partner = db.partner;
const PartnerHistory = db.partner_history;
const PartnerDocument = db.partner_document;

function validatePartnerForm(payload) {
  let errors = {};
  let isFormValid = true;

  if (!payload || typeof payload.company_name !== 'string' || payload.company_name.trim().length === 0) {
    isFormValid = false;
    errors.company_name = 'Please provide company_name.';
  }

  if (!payload || typeof payload.company_no !== 'string' || payload.company_no.trim().length === 0) {
    isFormValid = false;
    errors.company_no = 'Please provide company_no.';
  }

  if (!payload || typeof payload.email !== 'string' || payload.email.trim().length === 0 || !VALIDATOR.isEmail(payload.email)) {
    isFormValid = false;
    errors.email = 'Please provide Valid email.';
  }

  if (!VALIDATOR.isMobilePhone(payload.phone,'en-IN')) {
    isFormValid = false;
    errors.phone = 'Please provide Valid phone number.';
  }

  if (!payload || typeof payload.gst_no !== 'string' || payload.gst_no.trim().length === 0) {
    isFormValid = false;
    errors.gst_no = 'Please provide Gst No.';
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

  if (!payload || typeof payload.username !== 'string' || payload.username.trim().length === 0) {
    isFormValid = false;
    errors.username = 'Please provide username.';
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
    isFormValid = false;
    errors.password = 'Please provide password.';
  }

  return {
      success: isFormValid,
      errors
  };
}


function validatePartnerLoginForm(payload) {
  let errors = {};
  let isFormValid = true;

  if (!payload || typeof payload.username !== 'string' || payload.username.trim().length === 0) {
    isFormValid = false;
    errors.username = 'Please provide username.';
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
    isFormValid = false;
    errors.password = 'Please provide password.';
  }

  return {
      success: isFormValid,
      errors
  };
}``

function isEmpty(object) {  
  return Object.keys(object).length === 0
}

exports.partnerSave = (req, res) => {
  let partnerData = req.body;
  let validationResult = validatePartnerForm(partnerData);
  if (!validationResult.success) {
      return res.status(400).json({
          message: 'Form validation failed!',
          errors: validationResult.errors
      });
  }
  const partner = new Partner(partnerData);
  partner.save((err, partner) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }else {
      res.status(200).send({ message: "partner Saved Successfully" });
      return;    
    }
  });
};

exports.partnerUpdate = (req, res) => {
  let partnerData = req.body;
  let validationResult = validatePartnerForm(partnerData);
  if (!validationResult.success) {
      return res.status(400).json({
          message: 'Form validation failed!',
          errors: validationResult.errors
      });
  }
  Partner.findByIdAndUpdate({_id:partnerData.id},partnerData, { new: true },(err, partner) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }else{
      res.status(200).send({ message: "partner Updated Successfully"  });
      return;
    }
  });
};

exports.partnerList = (req, res) => {
    Partner.find({
    is_active: 1,
    status: req.params.status
  })
  .exec((err, partner) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send({ data:partner, message: "" });
  });
};

exports.partnerByPhone = (req, res) => {
    Partner.find({
    is_active: 1,
    phone:req.params.phone
  })
  .exec((err, partner) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if(partner){
      res.status(200).send({ data:partner, message: "" });
    }else{
      res.status(200).send({ message: "No Data Avaiable" });
    }
  });
};

exports.partnerLogin = (req, res) => {
  let partnerData = req.body;
  let validationResult = validatePartnerLoginForm(partnerData);
  if (!validationResult.success) {
      return res.status(400).json({
          message: 'Form validation failed!',
          errors: validationResult.errors
      });
  }
  Partner.findOne({
    is_active: 1,
    username:req.body.username,
    password:req.body.password
  })
  .exec((err, partner) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if(!isEmpty(partner)){
      res.status(200).send({ data:partner, role: "partner", message: "Login Successfull" });
    }else{
      res.status(400).send({ message: "Invalid Login" });
    }
  });
};

exports.singlePartner = (req, res) => {
  Partner.find({
  is_active: 1,
  partner_id: req.params.partner_id
})
.exec((err, partner) => {
  if (err) {
    res.status(500).send({ message: err });
    return;
  }
  res.status(200).send({ data:partner, message: "" });
});
};

exports.partnerDocSave = (req, res, next) => {
let dest = path.resolve('uploads/partner/');
const file = req.files['document_img'];
const filename = req.body.document_name+'_'+req.body.partner_id+'.png';
file.mv(dest + "/" + req.body.document_name + "/" + filename, (err) => {
  if (err) {
      return res.status(500).send({ message: err, code: 200 });
  }
  PartnerDocument.updateOne({
    $and: [
      { partner_id: req.body.partner_id },
      { document_name: req.body.document_name }
    ]
  },
  { 
    $set: {'partner_id':req.body.partner_id,'document_no':req.body.document_no,'document_name':req.body.document_name,'document_path':filename}
  },{ upsert: true },(err, partner) => {
    if (err) {
      res.status(500).send({ message: err.message });
      return;
    }else{
      res.status(200).send({ message: "partner Document Saved Successfully"  });
      return;
    }
  })
});
};

exports.partnerDocList = (req, res) => {
  PartnerDocument.find({
  is_active: 1,
  partner_id: req.params.partner_id
})
.exec((err, partner) => {
  if (err) {
    res.status(500).send({ message: err });
    return;
  }
  res.status(200).send({ data:partner, message: "" });
});
};

exports.partnerStatusUpdate = (req, res) => {
let partnerData = req.body;
Partner.updateOne({partner_id:partnerData.partner_id}, {status:partnerData.status, reject_reason:partnerData.reject_reason},(err, partner) => {
  if (err) {
    res.status(500).send({ message: err });
    return;
  }else{
    res.status(200).send({ message: "partner Status Chnaged Successfully"  });
    return;
  }
});
};

exports.partnerDocImage = (req, res) => {
return res.sendFile(req.query.imgpath, { root: '.' })
};

exports.partnerApproveReject = (req, res) => {
let partnerData = req.body;
Partner.updateOne({partner_id:partnerData.partner_id}, req.body ,(err, partner) => {
  if (err) {
    res.status(500).send({ message: err });
    return;
  }else{
    if(req.body.status === 1){
      res.status(200).send({ message: "partner Rejected"  });
      return;
    }
    if(req.body.status === 3){
      res.status(200).send({ message: "partner Approved Successfully"  });
      return;
    }
  }
});
};

exports.partnerHistorySave = (req, res) => {
let partnerData = req.body;
const partnerhistory = new PartnerHistory({partner_id: partnerData.partner_id, action: partnerData.action, remark: partnerData.remark, reason: partnerData.reason });
partnerhistory.save((err, partner) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }else {
      Partner.updateOne({partner_id:partnerData.partner_id}, {status:partnerData.partnerhistorystatus},(err, partners) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }else{
          if(partnerData.partnerhistorystatus === '3'){
            res.status(200).send({ message: "partner Activated Successfully" });
            return;   
          }
          if(partnerData.partnerhistorystatus === '4'){
            res.status(200).send({ message: "partner Deactivated Successfully" });
            return;   
          } ;
          // res.status(200).send({ data: partners });
        }
      });
      
    }
});
};

exports.partnerHistoryList = (req, res) => {
  PartnerHistory.find({
  partner_id: req.params.partner_id
})
.exec((err, partner) => {
  if (err) {
    res.status(500).send({ message: err });
    return;
  }
  res.status(200).send({ data:partner, message: "" });
});
};