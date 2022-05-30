
export default [
    {
        url: '\/api\/user\/info/\*',
        type: 'post',

        response: config => {
            let return_list=[];
            let params=JSON.parse(config.body).params;
            const user_id=params.user_id;
            //查询数据库,把用户信息push进去
            const generateData = () => {
                let unit={
                    phonenumber:"13500000000",
                    username:"张三",
                    age:"18",
                    email:"123333@qq.com",
                    user_id:user_id,
                    gender:"男",
                    hereditary:"中风",
                    pastill:"哮喘、心脏病",
                    height:"178cm",
                    weight:"65kg"
                }
                return_list.push(unit);
            };
            generateData()
            return {
                code: "200",
                data: return_list
            }
        }
    },
    {
        url: '\/api\/user\/notice\/query/\*',
        type: 'post',

        response: config => {
            let return_list=[];
            let params=JSON.parse(config.body).params;
            const user_id=params.user_id;

            return {
                code:200,
                data:[{
                    title:"预约到号提醒",
                    date:"2022-05-20",
                    content:"您预约的xx已到号，请尽快就诊"
                },{
                    title:"预约到号提醒",
                    date:"2022-05-20",
                    content:"您预约的xx已到号，请尽快就诊"
                }]
            }
        }
    },
    {
        url: '\/api\/user\/avatar/\*',
        type: 'post',

        response: config => {
            return {
                code:200,
            }
        }
    },
    {
        url: '\/api\/user\/getavatar/\*',
        type: 'get',

        response: config => {
            return {
                code:200,
                data:[{
                    url:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.meituan.net%2Favatar%2F8e121229f5fbde1040d0969a095afdbf49867.jpg&refer=http%3A%2F%2Fimg.meituan.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1656347237&t=a2e060b70f467b8b6171d71baa64485c"
                }]
            }
        }
    },
    {
        url: '\/api\/user\/set_info/\*',
        type: 'post',

        response: config => {
            let params=JSON.parse(config.body).params;
            const user_id=params.user_id;
            const gender=params.gender;
            const age=params.age;
            const hereditary=params.hereditary;
            const pastill=params.pastill;
            const height=params.height;
            const weight=params.weight;
            return {
                code:200,
                data:[{
                    user_id:user_id,
            gender:gender,
            age:age,
            hereditary:hereditary,
            pastill:pastill,
            height:height,
            weight:weight
                }]
            }
        }
    },
    {
        
        url: '\/api\/user\/doctor\/addcollect\*',
        type: 'post',

        response: config => {
            return {
                code:200,
                status:"success"
            }
        }
    },
    {
        url: '\/api\/user\/doctor\/collectlist/\*',
        type: 'get',

        response: config => {
            return {
                code:200,
                data:[{
                    doctor_name:"张三",
                    doctor_info:"耳鼻喉科主任，30年从医经验。"
                },{
                    doctor_name:"李四",
                    doctor_info:"骨科主任，20年从医经验。"
                },{
                    doctor_name:"王五",
                    doctor_info:"妇科主任，25年从医经验。"
                }]
            }
        }
    } 
    
]
