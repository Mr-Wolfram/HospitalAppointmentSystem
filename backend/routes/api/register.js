// function formatDate(date, format) {
//     const map = {
//         mm: date.getMonth() + 1,
//         dd: date.getDate(),
//         yyyy: date.getFullYear()
//     }

//     return format.replace(/mm|dd|yyyy/gi, matched => map[matched])
// }


// const randomAddTime = () => {
//     let now = new Date();
//     var now_s = now.getTime();
//     let then = now;
//     const rdHourNum = Math.ceil(Math.random()); //0 or 1
//     const rdMintueNum = Math.ceil(Math.random() * 60); // 1-60
//     then.setTime(now_s + 1000 * 60 * (rdMintueNum) + 1000 * 60 * 60 * rdHourNum);
//     return then;
// };

function stringToDataBySplit(dateString) {
    if (dateString) {
        // let timearray = dateString.split('-');
        let timearray = dateString.replace(/-/g,'/');
        // var year = timearray[0];
        // var month = timearray[1];
        // var date = timearray[2];
        // console.log(year);
        // console.log(month);
        // console.log(date);
        // var time_date = new Date(year, month - 1, date+1);
        var time_date = new Date(timearray);
        return time_date;
    } else {
        console.log("data String null")
    }
}

const express = require('express'),
    router = express.Router();

const order = require('../../models/order');
const Order = require("../../models/order"),
    Patient = require("../../models/patient");
// get
router.get('/get', async(req, res, next) => {
    let _date = req.query.date;
    let _doctor_id = req.query.doctor_id;
    _date = stringToDataBySplit(_date);

    let order_data = (await Order.find({
        doctor_id: _doctor_id,
        date: _date
    }).exec()) || [];
    console.log(_date);
    console.log(order_data);
    let patient_data = (await Patient.find({
        user_id: order_data.user_id,
    }).exec()) || [];
    console.log(patient_data);
    var array = [];
    _user_id = order_data.map((value)=>value.user_id).join(',');
    _name = patient_data.map((value)=>value.name).join(',');
    _time = order_data.map((value)=>value.time).join(',');
    for(var i=0; i<_user_id.length; i++){
        array.push({user_id:_user_id[i],
                    name:_name[i],
                    time:_time[i]});
        // array.push(_user_id[i]);
        // array.push(_name[i]);
        // array.push(_time[i]);
    }
    let r = {
        status: 100,
        msg: "success",
        data: array
    }

    console.log(r);
    res.json(r);
});

module.exports = router;