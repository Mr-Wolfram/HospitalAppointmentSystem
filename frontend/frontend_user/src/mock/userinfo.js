
export default [
    {
        url: '\/user\/userinfo/\*',
        type: 'post',
        
        response: config => {
            let return_list=[];
            let params=JSON.parse(config.body).params;
            const user_id=params.user_id;
            //查询数据库,把用户信息push进去
            const generateData = () => {
                let unit={
                    phonenumber:"13500000000",
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
    }
]
