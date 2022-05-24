import http from '../request.js'

export default {
    async get_query_order(user_id,payment_state,department,start_date,end_date) {
        return await http.post('/user/order_query', {
            user_id:user_id,
            payment_state:payment_state,
            department:department,
            start_date:start_date,
            end_date:end_date
        })
    },
}
