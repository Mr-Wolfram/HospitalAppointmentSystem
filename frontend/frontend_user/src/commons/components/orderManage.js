import http from '../request.js'

export default {
    async get_query_order(user_id,order_id,doctor_name,status,department,start_date,end_date) {
        return await http.post('/user/order_query', {
            user_id:user_id,
            order_id:order_id,
            doctor_name: doctor_name,
            payment_state:status,
            department:department,
            start_date:start_date,
            end_date:end_date
        })
    },
}
