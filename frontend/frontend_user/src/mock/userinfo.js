
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
                    IDnum:"35111111111111111",
                    username:"张三",
                    age:"18",
                    email:"123333@qq.com",
                    user_id:user_id,
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
    }
]
