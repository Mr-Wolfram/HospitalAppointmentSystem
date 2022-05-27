export default [
    {
        url: '\/user/check/name\*',
        type: 'post',
        response:config=>{
            let params=JSON.parse(config.body).username;
            // console.log("register info",params);
            return {
                code:200,
                data:{
                    "IsExist":false
                }
            }
        }
    },
    {
        url: '\/user/check/phone\*',
        type: 'post',
        response:config=>{
            let params=JSON.parse(config.body).phone;
            // console.log("register info phone",params);
            return {
                code:200,
                data:{
                    "IsExist":false
                }
            }
        }
    },
    {
        url: '\/user/register\*',
        type: 'post',
        response:config=>{
            let params=JSON.parse(config.body);
            let username=params.username;
            let phone = params.phone;
            let password=params.password;

            // console.log("register info phone",params);
            return {
                code:200,
                data:{
                    "status":"success"
                }
            }
        }
    },

    {
        url: '\/user/login_pwd\*',
        type: 'post',
        response:config=>{
            let params=JSON.parse(config.body);
            let username=params.username;
            let password=params.password;

            // console.log("register info phone",params);
            return {
                code:200,
                data:{
                    "status":"success",
                    "user_id":"001001"
                }
            }
        }
    },
    {
        url: '\/user/login_phone\*',
        type: 'post',
        response:config=>{
            let params=JSON.parse(config.body);
            let phone=params.phone;
            let idcode=params.idcode;

            // console.log("register info phone",params);
            return {
                code:200,
                data:{
                    "status":"success",
                    "username":"xiaoma",
                    "user_id":"001001"
                }
            }
        }
    }
]

