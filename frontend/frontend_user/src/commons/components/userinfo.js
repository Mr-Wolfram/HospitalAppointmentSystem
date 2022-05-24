import http from '../request.js'

export default {
    async get_userinfo(user_id) {
        return await http.post('/user/userinfo', {
            user_id:user_id,
        })
    },
}
