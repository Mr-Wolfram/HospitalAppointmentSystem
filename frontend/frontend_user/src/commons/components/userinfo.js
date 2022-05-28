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
}
