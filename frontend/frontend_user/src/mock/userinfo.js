
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
                    avatar:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.meituan.net%2Favatar%2F8e121229f5fbde1040d0969a095afdbf49867.jpg&refer=http%3A%2F%2Fimg.meituan.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1656347237&t=a2e060b70f467b8b6171d71baa64485c",
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
    },
    {
        url: '\/api\/user\/avatar/\*',
        type: 'post',

        response: config => {
            return {
                code:200,
            }
        }
    }
]
