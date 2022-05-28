export default [
    {
        url:'/api/user/log',
        type:'post',
        response: config =>{
            return {
                code:200,
                data:[
                        {timestamp:"2022-04-04 08:09",description:"修改绑定手机号"},
                        {timestamp:"2022-05-01 16:03",description:"修改头像"},
                        {timestamp:"2022-05-03 20:10",description:"挂号：外科 张三 医生"},
                        {timestamp:"2022-05-03 23:01",description:"创建订单"}
                    ]
            }
        }
    },
    {
        url:'/api/user/health/tips',
        type:'post',
        response: config =>{
            return{
                code:200,
                data:[
                    {total:"11.9",change_rate:1},
                    {pulse_oximeter:"97.6%",change_rate:4},
                    {sleep_quality:"11.6",change_rate:-1},
                    {heart_rate:"98.2",change_rate:1}
                ]
            }
        }
    }
]
