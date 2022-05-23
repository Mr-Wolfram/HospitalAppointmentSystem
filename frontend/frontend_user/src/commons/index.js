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
    async post_doctor_info(date) {
      return await http.post('/doctor/info', {
        date: date
      })
    },

    async post_doctor_select(doctorId) {
      return await http.post('/doctor/select', {
        doctorId: doctorId
      })
    },

    async post_appointment_form() {
      return await http.post('/appointment/form', {

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