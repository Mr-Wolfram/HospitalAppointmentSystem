import http from '../request.js'

export default {
    async get_query_order(user_id,order_id,doctor_name,status,department,start_date,end_date) {
        return await http.get('/api/user/order/query', {
            user_id:user_id,
            order_id:order_id,
            doctor_name: doctor_name,
            status:status,
            department:department,
            start_date:start_date,
            end_date:end_date
        })
    },
    async post_order_comment(order_id,content) {
        return await http.post('/api/user/order/comment', {
            order_id: order_id,
            content: content
        })
    },
    async get_order_info(order_id){
            return await http.post('/api/user/order/info', {
                order_id: order_id,
            })

    }

}
