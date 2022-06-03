import http from '../request.js'

export default{
    async getdepartstruct(param){
        return await http.get('/api/user/department/list',{
          param:param
        })
    },
    /*
    async getdepartinfo(param){
      return await http.get('/getdepartinfo',{
        param:param
      })
    },
    */

    async getdepartinfo(depart_name){
      return await http.get('/api/user/department/query',{
        depart_name:depart_name
      })
    },

    /*
    async getdoctorinfo(param){
      return await http.get('/getdoctorinfo',{
        param:param
      })
    },
    */

    async getdoctorinfo(doctor_name,depart_name){
      return await http.get('/api/user/doctor/query',{
        name:doctor_name,
        depart:depart_name
      })
    },

    /*
    async getqueryschdule(param){
      return await http.get('/getqueryschdule',{
        param:param
      })
    },
    */

    async postqueryschdule(weekdays,departments){
      return await http.post('/api/user/schedule/query',{
        weekdays:weekdays,
        department:departments,
      })
    }
}
