const mongoose = require("mongoose");
const Ride = mongoose.model(
  "Ride",
  new mongoose.Schema({
    ride_id: {type:String},
    user_id: {type:String, default: null},
    driver_id: {type:String, default: null},
    partner_id: {type:String, default: null},
    company_name: {type:String, default: null},
    ostype:  {type:String, default: null},
    fueltype:  {type:String, default: null},
    triptype:  {type:String, default: null},
    vehicle_type:  {type:String, default: null},
    car_model:  {type:String, default: null},
    vehicle_transmission:  {type:String, default: null},
    car_no:  {type:String, default: null},
    appointment_no:  {type:String, default: null},
    pickupaddress:  {type:String, default: null},
    pickuplat: {type:String, default: null},
    pickuplng: {type:String, default: null},
    droplat: {type:String, default: null},
    droplng: {type:String, default: null},
    dropaddress:  {type:String, default: null},
    drivernote:  {type:String, default: null},
    pickuptime:{type:Date, default: Date.now()},
    droptime:{type:Date, default: Date.now()},
    requesttime:{type:Date, default: Date.now()},
    bookingtype: {type:String, default: null},
    price: {type:String, default: null},
    rating: {type:String, default: null},
    feedback: {type:String, default: null},
    cancelled_reason: {type:String, default: null},
    status: {type:Number, default: 1},
    is_active: {type:Number, default: 1},
    created_on: {type:Date, default: Date.now()},
    updated_on: {type:Date, default: Date.now()},
  },{
    versionKey: false // You should be aware of the outcome after set to false
  })
);
module.exports = Ride;