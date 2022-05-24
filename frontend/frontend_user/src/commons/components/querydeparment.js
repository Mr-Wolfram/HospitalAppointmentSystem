import http from '../request.js'

export default{
    async getdepartstruct(param){
        return await http.get('/user/query_deparment',{
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

    async postdepartinfo(depart_name){
      return await http.post('/user/query_department',{
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

    async postdoctorinfo(doctor_name,depart_name){
      return await http.post('/user/query_doctor',{
        doctor_name:doctor_name,
        depart_name:depart_name
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
      return await http.post('/user/query_schedule',{
        weekdays:weekdays,
        departments:departments,
      })
    }
}