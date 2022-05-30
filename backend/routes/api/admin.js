const express = require("express"),
    router = express.Router();

const Admin = require("../../models/admin"),
    Doctor = require("../../models/doctor"),
    Schedule = require("../../models/schedule");

function stringToData(dateString) {
    if (dateString) {
        var year = dateString.slice(0, 4);
        var month = dateString.slice(4, 6);
        var date = dateString.slice(6, 8);
        var time_date = new Date(year, month - 1, date);
        return time_date;
    } else {
        console.log("data String null")
    }
}

// // not completed
router.post('/schedule/upload', async(req, res, next) => {
    console.log("into /schedule/upload")
    let _schedule_id = req.body.schedule_id;
    let _department = req.body.department;
    let _time = req.body.time;
    let _doctor_id = req.body.doctor_id;

    // time transfer

    let _date = stringToData(_schedule_id)

    // modified

    await Schedule.findOneAndUpdate({
        depart_id: _department
    }, {
        $set: {
            date: _date,
            time: _time,
            doctor_id: _doctor_id
        }
    }
    // , {}, function(err, data) { //debug function
    //     if (err) {
    //         console.log('Error in database')
    //     } else if (!data) {
    //         console.log('Not such data')
    //         console.log(data)
    //     } else {
    //         console.log('Modify schedule data success')
    //         console.log(data)
    //     }
    // }
    );

    let r = {
        status: 100,
        msg: "success",
        data: {}
    };

    console.log(r);
    res.json(r);
});

// post: info_change
router.post('/doctor/info_change', async(req, res, next) => {
    console.log("into /doctor/info_change")
    let _doctor_id = req.body.doctor_id;
    let _department = req.body.department;
    let _position = req.body.position;

    await Doctor.findOneAndUpdate({
        doctor_id: _doctor_id
    }, {
        $set: {
            dept_id: _department,
            position: _position
        }
    }
    // , {}, function(err, data) { //debug function
    //     if (err) {
    //         console.log('Error in database')
    //     } else if (!data) {
    //         console.log('Not such data')
    //         console.log(data)
    //     } else {
    //         console.log('Modify doctor data success')
    //         console.log(data)
    //     }
    // }
    );

    let r = {
        status: 100,
        msg: "success",
        data: {}
    };

    console.log(r);
    res.json(r);
})
module.exports = router;