import http from '../request.js'
export default {
    async post_useraction(user_id) {
        return await http.post('/api/user/log',{
            user_id:user_id,
        })
    },
    async post_userhealthinfo(user_id){
        return await http.post('/api/user/health/tips',{
            user_id:user_id,
        })
    }
}
