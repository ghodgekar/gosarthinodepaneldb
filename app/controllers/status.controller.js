const db = require("../models");
const Status = db.status;
exports.statusSave = (req, res) => {
  const status = new Status(req.body);
  status.save((err, status) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }else {
      res.status(200).send({ message: "Status Saved Successfully" });
      return;    
    }
  });
};

exports.statusUpdate = (req, res) => {
  Status.updateOne({id:req.body.id},{$push: { name: req.body.name, child: {id : {$each:req.body.child.id, $position:0} , name: {$each:req.body.child.name, $position:0}} } },(err, status) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }else{
      res.status(200).send({ message: "Status Updated Successfully"  });
      return;    
    }
  });
};

exports.statusList = (req, res) => {
  Status.findOne({
    is_active: 1
  })
  .exec((err, status) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send({ data:status, message: "" });
  });
};