import http from '../request.js'
import cookie from 'react-cookies'

export default {
    async get_userinfo(user_id) {
        return await http.get('/api/user/info', {
            user_id:user_id,
        },cookie.load("token"))
    },
    async set_userinfo(user_id,gender,age,hereditary,pastill,height,weight) {
        return await http.post('/api/user/set_info', {
            user_id:user_id,
            gender:gender,
            age:age,
            hereditary:hereditary,
            pastill:pastill,
            height:height,
            weight:weight
        })
    },
    async get_notice(user_id) {
        return await http.get('/api/user/notice/query', {
            user_id:user_id,
        })
    },
    async get_avatar(user_id) {
        return await http.get('/api/user/getavatar', {
            user_id:user_id,
        },cookie.load("token"))
    },
    async collect_doctor_list(user_id) {
        return await http.get('/api/user/doctor/collectlist', {
            user_id:user_id,
        })
    },
    async collect_doctor(user_id,doctor_id) {
        return await http.post('/api/user/doctor/addcollect', {
            user_id:user_id,
            doctor_id:doctor_id
        })
    },
    async set_phone(user_id,phone) {
        return await http.post('/api/user/info/setphone', {
            user_id:user_id,
            phone:phone
        })
    },
    async set_email(user_id,email) {
        return await http.post('/api/user/info/setemail', {
            user_id:user_id,
            email:email
        })
    },
}
