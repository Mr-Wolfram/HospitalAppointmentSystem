import http from './request.js'

export default {
    async get_filelist(param) {
        return await http.get('/getList/file', {
            param:param
        })
    },
    async post_file(file_url,file_name) {
      return await http.post('/upload/file', {
          file_url:file_url,file_name:file_name
      })
    },
    // add  here
    async get_doctor_info(date) {
      return await http.get('/api/user/registration/info', {
        date: date
      })
    },

    async get_doctor_select(doctorId) {
      return await http.get('/api/user/registration/select', {
        doctorId: doctorId
      })
    },

    async post_registration_form(user_id, doctor_id, time) {
      return await http.post('/api/user/registration/form', {
        user_id: user_id,
        doctor_id: doctor_id,
        time: time,
      })
    },

    async get_registration_pay(order_id) {
      return await http.get('/api/user/registration/pay', {
        order_id: order_id,
      })
    },
    async order_revoke(order_id,user_id) {
        return await http.post('/api/user/order/delete', {
            order_id: order_id,
            user_id:user_id //注意是userId还是user_id
        })
    },
    async order_create(orderId,userId,department,doctorId) {
        return await http.post('/api/user/order/create', {
            order_id: orderId,
            user_id:userId, //注意是userId还是user_id
            department:department,
            doctor_id:doctorId
        })
    },

}


export const ROUTE_BASE_NAME = process.env.BASE_NAME || '';

export function toHome() {
  window.location.href = `${ROUTE_BASE_NAME}/home`
}

export function toLogin() {
  window.location.href = `${ROUTE_BASE_NAME}/login`
}

export function isLogin() {
  const loginUser = sessionStorage.getItem('login');

  return loginUser ? true : null;
}

/**
 * 验证密码
 * @param {String,Number} pass
 * @returns {Boolean}
 */
export function passwordValid(pass) {
  const reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,20}$/
  return reg.test(pass)
}

/**
 * 验证电话号码
 * @param {String,Number} phone
 * @returns {Boolean}
 */
export function phoneValid(phone) {
  const reg = /^1[3|4|5|6|7|8][0-9]{9}$/
  return reg.test(phone)
}
