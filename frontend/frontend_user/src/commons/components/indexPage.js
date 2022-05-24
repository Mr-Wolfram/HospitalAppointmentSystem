import http from '../request.js'
export default {
    async post_useraction(user_id) {
        return await http.post('/user/query_action',{
            user_id:user_id,
        })
    },
    async post_userhealthinfo(user_id){
        return await http.post('/user/query_health_info',{
            user_id:user_id,
        })
    }
}
