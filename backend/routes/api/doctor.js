const express = require('express'),
    router = express.Router();

const Doctor = require('../../models/doctor'),
    Schedule = require('../../models/schedule'),
    Order = require('../../models/order'),
    Patient = require('../../models/patient'),
    Diagnosis = require('../../models/diagnosis');
const { v4: uuidv4 } = require('uuid');

router.get('/info/details', async(req, res, next) => {
    let id = req.query.doctor_id;
    let data = await Doctor.findOne({ doctor_id: id });
    let r = {
        status: 100,
        msg: "success",
        data: data
    };
    console.log(r);
    res.json(r);
});

//Luyao Ma
router.get("/schedule", async(req, res, next) => {
    let id = req.query.doctor_id;
    let data = await Schedule.find({ doctor_id: id });
    let r = {
        status: 200,
        msg: "success",
        data: data
    };
    console.log(r);
    res.json(r);
});


//Yiping Wang


// wyp add the following function
// not completed, if paging is needed

const doctorinfoToInterface = (doc) => {
    if (doc !== null && doc !== undefined) {
        return {
            doctor_id: doc.doctor_id,
            doctor_name: doc.name,
            department: doc.dept_id,
            position: doc.position,
            moreUrl: "/api/user/" + doc.doctor_id + "/info"
        };
    }
    return doc;
};

// get list of information
router.get('/info/get', async(req, res, next) => {
    console.log("into info/get");
    let _name = req.query.name;
    let _department = req.query.department;
    let _page_size = req.query.page_size;
    let _page_num = req.query.page_num; // start from 1

    // search

    let _data = (await Doctor.find({
            name: _name,
            dept_id: _department
        }).sort({ doctor_id: 1 })
        .skip((_page_num - 1) * _page_size)
        .limit(_page_size) //page
        .exec()) || [];

    let result = _data.map(doctorinfoToInterface);

    // return
    let r = {
        status: 100,
        msg: "success",
        data: {
            return_count: 10,
            doctor_list: result
                // [{
                //     //not sure if this way works
                //     doctor_id: _data.doctor_id,
                //     doctor_name: _data.name,
                //     department: _data.dept_id,
                //     position: _data.position,
                //     moreUrl: "/api/user/" + _data.doctor_id + "/info"
                // }]
        }
    };

    console.log(r);
    res.json(r);
});



// post: modify
router.post('/info/modify', async(req, res, next) => {
    let _doctor_id = req.body.doctor_id;
    let _doctor_name = req.body.doctor_name;
    let _gender = req.body.gender;
    let _age = req.body.age;
    let _department = req.body.department;
    let _photo = req.body.photo;
    let _position = req.body.position;

    // modified

    await Doctor.findOneAndUpdate({
            doctor_id: _doctor_id
        }, {
            $set: {
                name: _doctor_name,
                gender: _gender,
                age: _age,
                dept_id: _department, // should not be uuidv4 here?
                photo: _photo,
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
        //         console.log('Modify data success')
        //         console.log(data)
        //     }
        // }
    );

    // return
    let r = {
        status: 100,
        msg: "Permission denied",
    };

    console.log(r);
    res.json(r);
});

// post: call
router.post('/call', async(req, res, next) => {
    let _user_id = req.body.user_id;

    deletedOrder = await Order.findOne({ user_id: _user_id });
    console.log(deletedOrder);

    await Order.findOneAndRemove({
            user_id: _user_id // some problem here ---> one patient <-> one order_id 
        }
        // , {}, function(err, data) { //debug function
        //     if (err) {
        //         console.log('Error in database')
        //     } else if (!data) {
        //         console.log('Not such data')
        //         console.log(data)
        //     } else {
        //         console.log('Remove data success')
        //         console.log(data)
        //     }
        // }
    );

    // return
    let r = {
        status: 100,
        msg: "Permission denied",
    };

    console.log(r);
    res.json(r);
});


function formatDate(date, format) {
    const map = {
        mm: date.getMonth() + 1,
        dd: date.getDate(),
        yyyy: date.getFullYear()
    }

    return format.replace(/mm|dd|yyyy/gi, matched => map[matched])
};



const patientDocToInterface = (doc) => {

};

// get: patient_info
router.get('/patient_info/get', async(req, res, next) => {
    let _user_id = req.query.user_id;
    // let today = new Date();
    // let n = today.getHours();
    // formatDate(today, 'yyyy-mm-dd');

    // if (n >= 0){

    // }

    let _data = (await Patient.findOne({
        user_id: _user_id
    }).exec()) || [];


    let order_data = (await Order.findOne({
        user_id: _user_id
    }).exec()) || [];


    let _doctor_id = order_data.doctor_id;

    let doctor_data = (await Doctor.findOne({
        doctor_id: _doctor_id
    }).exec()) || [];
    console.log(doctor_data);
    let r = {
        id: _user_id,
        name: _data.name,
        gender: _data.gender,
        age: _data.age,
        phone: _data.phone,
        appoint_date: order_data.date,
        section: order_data.time, //SectionType.Afternoon, // need export, not completed []
        department: doctor_data.dept_id,
        history: [] //_data.history
    };

    console.log(r);
    res.json(r);
});


const diagnosisInterfaceToDoc = (interface) => {
    const now = new Date();
    // let _timestamp = formatDate(now, 'yyyy-mm-dd');

    if (interface !== null && interface !== undefined &&
        interface.diagnosis_id !== null && interface.diagnosis_id !== undefined) {
        return {
            diagnosis_id: uuidv4(),
            patient_id: interface.patient_id,
            doctor_id: interface.doctor_id,
            depart_id: interface.department,
            timestamp: now, //_timestamp,
            diagnosis_message: interface.diagnosis_message,
            medicine_message: interface.medicine_message
        }
    }
    return undefined;
};

// get: patient_info
router.post('/diagnostic_msg/upload', async(req, res, next) => {
    console.log("into /diagnostic_msg/upload");

    let doc = diagnosisInterfaceToDoc(req.body);

    console.log(doc);

    await Diagnosis.insertMany(doc);

    let r = {
        status: 100,
        msg: "Permission denied"
    };

    console.log(r);
    res.json(r);
});


module.exports = router;