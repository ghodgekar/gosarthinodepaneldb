const db = require("../models");
const CarModel = db.carmodel;

exports.carmodelList = (req, res) => {
    CarModel.find({
        Category:req.params.category
    })
    .exec((err, carmodel) => {
        if (err) {
        res.status(500).send({ message: err });
        return;
        }
        res.status(200).send({ data:carmodel, message: "" });
    });
};

exports.carcategoryList = (req, res) => {
    CarModel.find().distinct('Category')
    .exec((err, carmodel) => {
        if (err) {
        res.status(500).send({ message: err });
        return;
        }
        res.status(200).send({ data:carmodel, message: "" });
    });
};