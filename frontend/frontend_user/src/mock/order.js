// import Mock from 'mockjs'

// const Random = Mock.Random

import Time from "../pages/user/TimeTable/component/Time";

export default [
    {
        url: '\/user\/order_query/\*',
        type: 'post',

        response: config => {
            const x = 3;
            const y = 2;
            const z = 1;
            const gData = [];
            console.log("shen",config);
            let params=JSON.parse(config.body).params;
            // console.log("shen",params);
            const user_id=params.user_id;
            const status=params.status;
            const payment_STATE=["NONE","HAS_PAYED","NOT_PAYED"];
            const department=params.department;
            const start_date=params.start_date;
            const end_date=params.end_date;
            const order_id=params.order_id;
            const doctor_name=params.doctor_name;
            // query 符合条件的订单信息
            let return_list=[];
            //查询数据库,把每一个订单信息push进去
            const generateData = () => {
                let unit={
                    order_id:"zd01201030232",
                    user_id:user_id,
                    user_name:"zhang si",
                    status:"HAS_PAYED",
                    department:"神经内科",
                    doctor_id:"0123",
                    doctor_name:"张三",
                    time:new Date("2022-02-03 13:34:00"),
                }
                return_list.push(unit);
            };
            return_list.push({
                order_id:"zd02434332434",
                user_id:user_id,
                user_name:"zhang si",
                status:"HAS_FINISHED",
                department:"五官科",
                doctor_id:"0143",
                doctor_name:"林建华",
                time:new Date("2022-04-02 08:24:30"),
            })
            generateData()
            return {
                code: 200,
                data: return_list
            }
        }
    },{
        url: '\/user\/order_delete/\*',
        type: 'post',

        response: config => {

        }
    }
]
