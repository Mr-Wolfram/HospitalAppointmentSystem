import http from '../request.js'

export default {
    async get_userinfo(user_id) {
        return await http.post('/api/user/info', {
            user_id:user_id,
        })
    },
    async get_notice(user_id) {
        return await http.post('/api/user/notice/query', {
            user_id:user_id,
        })
    },
    async set_avatar(user_id,url) {
        return await http.post('/api/user/avatar', {
            user_id:user_id,
            url:url
        })
    },
    async collect_doctor_list(user_id) {
        return await http.get('/api/user/doctor/collectlist', {
            user_id:user_id,
        })
    },
}
