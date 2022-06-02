import http from '../request.js'

export default {
    async checkname(username) {
        return await http.get('/api/user/check/name', {
            username:username,
        })
    },
    async checkpwd(username,password) {
        return await http.post('/api/user/login/pwd', {
            username:username,
            password:password
        })
    },
    async checkphone(phone) {
        return await http.get('/api/user/check/phone', {
            phone:phone,
        })
    },
    async checkidcode(phone,idcode) {
        return await http.post('/api/user/login/idcode', {
            phone:phone,
            idcode:idcode
        })
    },
    async register(username,password,phone) {
        return await http.post('/api/user/register', {
            username:username,
            password:password,
            phone:phone,
        })
    },
}