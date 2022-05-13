const db = require("../models");
const Country = db.country;
const State = db.state;
const City = db.city;
//country
exports.countrySave = (req, res) => {
  const country = new Country({
    name: req.body.name,
    is_home: req.body.is_home
  });
  country.save((err, country) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (req.body.name) {
      return res.send({ message: "Country Saved successfully!" });
    }else{
      return res.send({ message: "Country Name Not Found!" });
    }
  });
};
exports.countryList = (req, res) => {
  Country.findOne({
    is_active: 1
  })
  .exec((err, country) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send({ data:country, message: "" });
  });
};

//state
exports.stateSave = (req, res) => {
  const state = new State({
    name: req.body.name
  });
  state.save((err, state) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (req.body.country_id) {
      Country.find(
        {
          name: { $in: req.body.country_id }
        },
        (err, country) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          state.country_id = country.map(country => country._id);
          state.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            res.send({ message: "State Saved successfully!" });
          });
        }
      );
    }else{
      return res.send({ message: "State Name Not Found!" });
    }
  });
};
exports.stateList = (req, res) => {
  State.findOne({
    is_active: 1,
    country_id:req.params.country_id
  })
  .populate("country_id")
  .exec((err, state) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send({
      data:
      {
        id: state._id,
        name: state.name,
        country: state.country_id.name
      },
      message: ""
    });
  });
};

//city
exports.citySave = (req, res) => {
  const city = new City({
    name: req.body.name
  });
  city.save((err, city) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (req.body.state_id) {
      State.find(
        {
          name: { $in: req.body.state_id }
        },
        (err, state) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          city.state_id = state.map(state => state._id);
          city.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            res.send({ message: "city Saved successfully!" });
          });
        }
      );
    }else{
      return res.send({ message: "city Name Not Found!" });
    }
  });
};
exports.cityList = (req, res) => {
  City.findOne({
    is_active: 1,
    state_id:req.params.state_id
  })
  .populate("state_id")
  .exec((err, city) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(200).send({
      data:
      {
        id: city._id,
        name: city.name,
        state: city.state_id.name
      },
      message: ""
    });
  });
};