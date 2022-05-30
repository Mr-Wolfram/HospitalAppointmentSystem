import http from '../request.js'

export default {
    async get_userinfo(user_id) {
        return await http.post('/api/user/info', {
            user_id:user_id,
        })
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
        return await http.post('/api/user/notice/query', {
            user_id:user_id,
        })
    },
    async get_avatar(user_id) {
        return await http.get('/api/user/getavatar', {
            user_id:user_id,
        })
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
}
