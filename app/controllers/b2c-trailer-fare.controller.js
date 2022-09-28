const db = require("../models");
const PriceCalculator = db.price_calculator;
const DistanceCalculator = db.distance_calculator;
const B2BDriverFare = db.b2b_driver_fare;

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
                    return res.status(200).send({ msg:'Rs.'+ fareData.rs });
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
                    return res.status(200).send({ msg:'Rs.'+ multiply });
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
                    return res.status(200).send({ msg:'Rs.'+ multiply });
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
        //             return res.status(200).send({ msg:'Rs.'+ fareData.rs });
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
        //             return res.status(200).send({ msg:'Rs.'+  multiply });
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
        //             return res.status(200).send({ msg:'Rs.'+  multiply });
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
        //             return res.status(200).send({ msg:'Rs.'+  multiply });
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
        //             return res.status(200).send({ msg:'Rs.'+  multiply });
        //         });
        //     }
        // }
    });
};

// exports.b2bFinalDriverCalculation = (req, res) => {
//     let rideData = req.body;

//     B2BDriverFare.find({
//         car_type:rideData.car_type,
//         transmission:rideData.transmission,
//         is_fuel:rideData.is_fuel,
//     })
//     .exec((err, dataloop) => {
//         if (err) {
//         res.status(500).send({ message: err });
//         return;
//         }
//         dataloop.forEach((data) => {
//             if(rideData.is_fuel == 1){
//                 if ((rideData.distancekm >= 120 && rideData.distancekm <= 199)) {
//                     if(rideData.distancekm >= data.from && rideData.distancekm <= data.to)
//                     {
//                         return res.status(200).send({ msg:'Rs.'+ data.rs });
//                     }
//                 }
//                 else if ((rideData.distancekm >= 200 && rideData.distancekm <= 299)) {
//                     if(rideData.distancekm >= data.from && rideData.distancekm <= data.to)
//                     {
//                         let multiply =data.rs +  ((rideData.distancekm - data.from) * data.exrtra_rs ) ;
//                         return res.status(200).send({ msg:'Rs.'+ multiply });
//                     }
//                 }
//                 else if ((rideData.distancekm >= 300 && rideData.distancekm <= 1499)) {
//                     if(rideData.distancekm >= data.from && rideData.distancekm <= data.to)
//                     {
//                         let multiply =rideData.distancekm * data.exrtra_rs  ;
//                         return res.status(200).send({ msg:'Rs.'+ multiply });
//                     }
//                 }
//                 else if ((rideData.distancekm >= 1500 && data.to == 0)) {
//                     if(rideData.distancekm >= data.from && data.to == 0)
//                     {
//                         let multiply =data.rs +  ((rideData.distancekm - data.from) * data.exrtra_rs ) ;
//                         return res.status(200).send({ msg:'Rs.'+ multiply });
//                     }
//                 }
//             }
//             if(rideData.is_fuel == 0){
//                 if (rideData.distancekm >= 16 && rideData.distancekm <= 40) {
//                     if(rideData.distancekm >= data.from && rideData.distancekm <= data.to)
//                     {
//                         let multiply =data.rs +  ((rideData.distancekm - data.from) * data.exrtra_rs ) ;
//                         return res.status(200).send({ msg:'Rs.'+ multiply });
//                     }
//                 }
//                 if ((rideData.distancekm >= 1 && rideData.distancekm <= 15)) {
//                     if(rideData.distancekm >= data.from && rideData.distancekm <= data.to)
//                     {
//                         return res.status(200).send({ msg:'Rs.'+ data.rs });
//                     }
//                 }
//                 else if ((rideData.distancekm >= 41 && rideData.distancekm <= 100)) {
//                     if(rideData.distancekm >= data.from && rideData.distancekm <= data.to)
//                     {
//                         let multiply =data.rs +  ((rideData.distancekm - data.from) * data.exrtra_rs ) ;
//                         return res.status(200).send({ msg:'Rs.'+ multiply });
//                     }
//                 }
//                 else if ((rideData.distancekm >= 101 && rideData.distancekm <= 200)) {
//                     if(rideData.distancekm >= data.from && rideData.distancekm <= data.to)
//                     {
//                         let multiply =data.rs +  ((rideData.distancekm - data.from) * data.exrtra_rs ) ;
//                         return res.status(200).send({ msg:'Rs.'+ multiply });
//                     }
//                 }
//                 else if ((rideData.distancekm >= 201 && rideData.distancekm <= 350)) {
//                     if(rideData.distancekm >= data.from && rideData.distancekm <= data.to)
//                     {
//                         let multiply =data.rs +  ((rideData.distancekm - data.from) * data.exrtra_rs ) ;
//                         return res.status(200).send({ msg:'Rs.'+ multiply });
//                     }
//                 }
//                 else if ((rideData.distancekm >= 351 && rideData.distancekm <= 450)) {
//                     if(rideData.distancekm >= data.from && rideData.distancekm <= data.to)
//                     {
//                         let multiply =rideData.distancekm * data.exrtra_rs;
//                         return res.status(200).send({ msg:'Rs.'+ multiply });
//                     }
//                 }
//                 else if ((rideData.distancekm >= 451 && rideData.distancekm <= 1000)) {
//                     if(rideData.distancekm >= data.from && rideData.distancekm <= data.to)
//                     {
//                         let multiply =rideData.distancekm * data.exrtra_rs  ;
//                         return res.status(200).send({ msg:'Rs.'+ multiply });
//                     }
//                 }
//                 else if ((rideData.distancekm >= 1001 && data.to == 0)) {
//                     if(rideData.distancekm >= data.from && data.to == 0)
//                     {
//                         let multiply =data.from * data.rs +  ((rideData.distancekm - data.from) * data.exrtra_rs ) ;
//                         return res.status(200).send({ msg:'Rs.'+ multiply });
//                     }
//                 }
//             }
//         });
//     });
// };

exports.b2bFinalDriverCalculation = (req, res) => {
    let rideData = req.body;
    B2BDriverFare.find({
        car_type:rideData.car_type,
        transmission:rideData.transmission,
        is_fuel:rideData.fuel_type
    })
    .exec((err, dataloop) => {
        if (err) {
        res.status(500).send({ message: err });
        return;
        }
        dataloop.forEach((data) => {
            if(rideData.fuel_type == 1){
                if ((rideData.distancekm >= 120 && rideData.distancekm <= 199)) {
                    if(rideData.distancekm >= data.from && rideData.distancekm <= data.to)
                    {
                        return res.status(200).send({ msg:'Rs.'+ data.rs });
                    }
                }
                else if ((rideData.distancekm >= 200 && rideData.distancekm <= 299)) {
                    if(rideData.distancekm >= data.from && rideData.distancekm <= data.to)
                    {
                        let multiply =data.rs +  ((rideData.distancekm - data.from) * data.exrtra_rs ) ;
                        return res.status(200).send({ msg:'Rs.'+ multiply });
                    }
                }
                else if ((rideData.distancekm >= 300 && rideData.distancekm <= 1499)) {
                    if(rideData.distancekm >= data.from && rideData.distancekm <= data.to)
                    {
                        let multiply =rideData.distancekm * data.exrtra_rs  ;
                        return res.status(200).send({ msg:'Rs.'+ multiply });
                    }
                }
                else if ((rideData.distancekm >= 1500 && data.to == 0)) {
                    if(rideData.distancekm >= data.from && data.to == 0)
                    {
                        let multiply =data.rs +  ((rideData.distancekm - data.from) * data.exrtra_rs ) ;
                        return res.status(200).send({ msg:'Rs.'+ multiply });
                    }
                }
            }
            if(rideData.fuel_type == 0){
                if (rideData.distancekm >= 16 && rideData.distancekm <= 40) {
                    if(rideData.distancekm >= data.from && rideData.distancekm <= data.to)
                    {
                        let multiply =data.rs +  ((rideData.distancekm - data.from) * data.exrtra_rs ) ;
                        return res.status(200).send({ msg:'Rs.'+ multiply });
                    }
                }
                if ((rideData.distancekm >= 1 && rideData.distancekm <= 15)) {
                    if(rideData.distancekm >= data.from && rideData.distancekm <= data.to)
                    {
                        return res.status(200).send({ msg:'Rs.'+ data.rs });
                    }
                }
                else if ((rideData.distancekm >= 41 && rideData.distancekm <= 100)) {
                    if(rideData.distancekm >= data.from && rideData.distancekm <= data.to)
                    {
                        let multiply =data.rs +  ((rideData.distancekm - data.from) * data.exrtra_rs ) ;
                        return res.status(200).send({ msg:'Rs.'+ multiply });
                    }
                }
                else if ((rideData.distancekm >= 101 && rideData.distancekm <= 200)) {
                    if(rideData.distancekm >= data.from && rideData.distancekm <= data.to)
                    {
                        let multiply =data.rs +  ((rideData.distancekm - data.from) * data.exrtra_rs ) ;
                        return res.status(200).send({ msg:'Rs.'+ multiply });
                    }
                }
                else if ((rideData.distancekm >= 201 && rideData.distancekm <= 350)) {
                    if(rideData.distancekm >= data.from && rideData.distancekm <= data.to)
                    {
                        let multiply =data.rs +  ((rideData.distancekm - data.from) * data.exrtra_rs ) ;
                        return res.status(200).send({ msg:'Rs.'+ multiply });
                    }
                }
                else if ((rideData.distancekm >= 351 && rideData.distancekm <= 450)) {
                    if(rideData.distancekm >= data.from && rideData.distancekm <= data.to)
                    {
                        let multiply =rideData.distancekm * data.exrtra_rs;
                        return res.status(200).send({ msg:'Rs.'+ multiply });
                    }
                }
                else if ((rideData.distancekm >= 451 && rideData.distancekm <= 1000)) {
                    if(rideData.distancekm >= data.from && rideData.distancekm <= data.to)
                    {
                        let multiply =rideData.distancekm * data.exrtra_rs  ;
                        return res.status(200).send({ msg:'Rs.'+ multiply });
                    }
                }
                else if ((rideData.distancekm >= 1001 && data.to == 0)) {
                    if(rideData.distancekm >= data.from && data.to == 0)
                    {
                        let multiply =data.from * data.rs +  ((rideData.distancekm - data.from) * data.exrtra_rs ) ;
                        return res.status(200).send({ msg:'Rs.'+ multiply });
                    }
                }
            }
        });
    });
};