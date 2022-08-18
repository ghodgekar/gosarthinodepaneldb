const db = require("../models");
const PriceCalculator = db.price_calculator;
const DistanceCalculator = db.distance_calculator;

exports.calculate = (req, res) => {
    let rideData = req.body;
    DistanceCalculator.findOne({
        car_type:rideData.car_type,
        transmission:rideData.transmission,
        is_fuel:1,
        is_active:1,
    })
    .exec((err, data) => {
        if (err) {
        res.status(500).send({ message: err });
        return;
        }
        if(rideData.fuel_type == 1){
            if ((rideData.distancekm >= 120 && rideData.distancekm <= 200)) {
                PriceCalculator.findOne({range_to: {$gte:rideData.distancekm},range_from: {$lte:rideData.distancekm},dis_id: data.id,
                })
                .exec((err, fareData) => {
                    if (err) {
                    res.status(500).send({ message: err });
                    return;
                    }
                    res.status(200).send({ msg:'Rs.'+ fareData.rs });
                });
            }
            if ((rideData.distancekm >= 201 && rideData.distancekm <= 299)) {
                PriceCalculator.findOne({range_to: {$gte:rideData.distancekm},range_from: {$lte:rideData.distancekm},dis_id: data.id,
                })
                .exec((err, fareData) => {
                    if (err) {
                    res.status(500).send({ message: err });
                    return;
                    }
                    let multiply =fareData.rs +  ((rideData.distancekm - 200) * fareData.per_km_rs ) ;
                    res.status(200).send({ msg:'Rs.'+ multiply });
                });
            }

            if (rideData.distancekm >= 300) {
                PriceCalculator.findOne({range_to: 0 , range_from: {$lte:rideData.distancekm}, dis_id: data.id,
                })
                .exec((err, fareData) => {
                    if (err) {
                    res.status(500).send({ message: err });
                    return;
                    }
                    let multiply =rideData.distancekm * fareData.per_km_rs  ;
                    res.status(200).send({ msg:'Rs.'+ multiply });
                });
            }
        }
        // if(rideData.fuel_type == 0){
        //     if ((rideData.distancekm >= "100" && rideData.distancekm <= "200")) {
        //         PriceCalculator.findOne({range_to: {$gte:rideData.distancekm},range_from: {$lte:rideData.distancekm},dis_id: data.id,
        //         })
        //         .exec((err, fareData) => {
        //             if (err) {
        //             res.status(500).send({ message: err });
        //             return;
        //             }
        //             res.status(200).send({ msg:'Rs.'+ fareData.rs });
        //         });
        //     }
        //     if ((rideData.distancekm >= "201" && rideData.distancekm <= "350")) {
        //         PriceCalculator.findOne({range_to: {$gte:rideData.distancekm},range_from: {$lte:rideData.distancekm},dis_id: data.id,
        //         })
        //         .exec((err, fareData) => {
        //             if (err) {
        //             res.status(500).send({ message: err });
        //             return;
        //             }
        //             let multiply =fareData.rs +  ((rideData.distancekm - 200) *fareData.per_km_rs ) ;
        //             res.status(200).send({ msg:'Rs.'+  multiply });
        //         });
        //     }
        //     if ((rideData.distancekm >= "351" && rideData.distancekm <= "450")) {
        //         PriceCalculator.findOne({range_to: {$gte:rideData.distancekm},range_from: {$lte:rideData.distancekm},dis_id: data.id,
        //         })
        //         .exec((err, fareData) => {
        //             if (err) {
        //             res.status(500).send({ message: err });
        //             return;
        //             }
        //             let multiply =rideData.distancekm *fareData.per_km_rs ;
        //             res.status(200).send({ msg:'Rs.'+  multiply });
        //         });
        //     }
        //     if ((rideData.distancekm >= "451" && rideData.distancekm <= "1000")) {
        //         PriceCalculator.findOne({range_to: {$gte:rideData.distancekm},range_from: {$lte:rideData.distancekm},dis_id: data.id,
        //         })
        //         .exec((err, fareData) => {
        //             if (err) {
        //             res.status(500).send({ message: err });
        //             return;
        //             }
        //             let multiply =rideData.distancekm *fareData.per_km_rs ;
        //             res.status(200).send({ msg:'Rs.'+  multiply });
        //         });
        //     }
        //     if (rideData.distancekm >= "1001") {
        //         PriceCalculator.findOne({range_to:0,range_from: {$lte:rideData.distancekm},dis_id: data.id,
        //         })
        //         .exec((err, fareData) => {
        //             if (err) {
        //             res.status(500).send({ message: err });
        //             return;
        //             }
        //             let multiply =( ( 1000 * fareData.rs) +  ((rideData.distancekm - 1000) *fareData.per_km_rs )) ;
        //             res.status(200).send({ msg:'Rs.'+  multiply });
        //         });
        //     }
        // }
    });
};
