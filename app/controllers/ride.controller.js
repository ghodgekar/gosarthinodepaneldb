const db = require("../models");
const Ride = db.ride;
exports.rideSave = (req, res) => {
  const ride = new Ride(req.body);
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

exports.rideList = (req, res) => {
    Ride.find({
    is_active: 1
  })
  .exec((err, ride) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send({ data:ride, message: "" });
  });
};