export default [
    {
        url: '\/api\/user\/check\/name\*',
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
        url: '\/api\/user\/check\/phone\*',
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
        url: '\/api\/user\/check\/email\*',
        type: 'post',
        response:config=>{
            let params=JSON.parse(config.body).email;
            // console.log("register info email",params);
            return {
                code:200,
                data:{
                    "IsExist":false
                }
            }
        }
    },
    {
        url: '\/api\/user\/check\/idcode\*',
        type: 'post',
        response:config=>{
            let params=JSON.parse(config.body).phone;
            // console.log("register info email",params);
            return {
                code:200,
                data:{
                    "idcode":123456
                }
            }
        }
    },
    {
        url: '\/api\/user\/register\*',
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
        url: '\/api\/user\/login\/pwd\*',
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
        url: '\/api\/user\/login\/idcode\*',
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

