// import Mock from 'mockjs'

// const Random = Mock.Random

import Time from "../pages/user/TimeTable/component/Time";
import React from "react";
import cookie from "react-cookies";


export default [
    {
        url: '\/user\/order_query/\*',
        type: 'post',

        response: config => {
            const x = 3;
            const y = 2;
            const z = 1;
            const gData = [];
            // console.log("shen",config);
            let params=JSON.parse(config.body).params;
            // console.log("shen",params);
            const user_id=params.user_id;
            const username=cookie.load("username");
            const status=params.status;

            const payment_STATE=["TRADE_SUCCESS","TRADE_FINISHED","WAIT_BUYER_PAY","TRADE_CLOSED"];
            const department=params.department;
            const start_date=params.start_date;
            const end_date=params.end_date;
            const order_id=params.order_id;
            const doctor_name=params.doctor_name;




            const exampleOrderList=[
                {
                    order_id:"zd02434332434",
                    user_id:user_id,
                    user_name:username,
                    status:"TRADE_SUCCESS",
                    department:"普通外科",
                    doctor_id:"d0143",
                    doctor_name:"王五",
                    time:new Date("2022-04-01 08:04:30"),
                },
                {
                    order_id:"zd02434332434",
                    user_id:user_id,
                    user_name:username,
                    status:"TRADE_SUCCESS",
                    department:"五官科",
                    doctor_id:"0143",
                    doctor_name:"林建华",
                    time:new Date("2022-04-02 08:14:30"),
                },
                {
                    order_id:"zd02434332434",
                    user_id:user_id,
                    user_name:username,
                    status:"TRADE_SUCCESS",
                    department:"五官科",
                    doctor_id:"0143",
                    doctor_name:"林建华",
                    time:new Date("2022-04-03 08:24:30"),
                },
                {
                    order_id:"zd02434332434",
                    user_id:user_id,
                    user_name:username,
                    status:"TRADE_SUCCESS",
                    department:"五官科",
                    doctor_id:"0143",
                    doctor_name:"林建华",
                    time:new Date("2022-04-04 08:34:30"),
                },
                {
                    order_id:"zd02434332434",
                    user_id:user_id,
                    user_name:username,
                    status:"TRADE_SUCCESS",
                    department:"五官科",
                    doctor_id:"0143",
                    doctor_name:"林建华",
                    time:new Date("2022-04-05 08:44:30"),
                },
                {
                    order_id:"zd02434332434",
                    user_id:user_id,
                    user_name:username,
                    status:"TRADE_SUCCESS",
                    department:"五官科",
                    doctor_id:"0143",
                    doctor_name:"林建华",
                    time:new Date("2022-04-06 08:54:30"),
                },{
                    order_id:"zd01201030232",
                    user_id:user_id,
                    user_name:username,
                    status:"TRADE_FINISHED",
                    department:"神经内科",
                    doctor_id:"0123",
                    doctor_name:"张三",
                    time:new Date("2022-02-03 13:34:00"),
                },{
                    order_id:"o1122334455",
                    user_id:"u1234",
                    user_name:"lyczju",
                    status:"TRADE_SUCCESS",
                    department:"骨科",
                    doctor_id:"d0001",
                    doctor_name:"竺可桢",
                    time:new Date("2022-05-24 15:50:00"),
                },{
                    order_id:"o1122334466",
                    user_id:"u1234",
                    user_name:"lyczju",
                    status:"WAIT_BUYER_PAY",
                    department:"骨科",
                    doctor_id:"d0041",
                    doctor_name:"吴朝晖",
                    time:new Date("2022-05-25 08:34:10"),
                }
            ]
            // query 符合条件的订单信息
            let return_list=[];
            //查询数据库,把每一个订单信息push进去


            const generateData = () => {
                for( let i in exampleOrderList){
                    if(exampleOrderList.hasOwnProperty(i)){
                        let unit=exampleOrderList[i];
                        let flag=1;
                        // console.log("i=",i,"unit=",unit,"flag=",flag);
                        if(department!==""){
                            if(unit.department!==department){
                                flag=0;
                            }
                            // console.log("why not flag1",department,flag);
                        }
                        if(status!==""){
                            if(unit.status!==status){
                                flag=0;
                            }
                            // console.log("why not flag2",status,flag);
                        }
                        if(doctor_name!==""){
                            if(unit.doctor_name!==doctor_name){
                                flag=0;
                            }
                            // console.log("why not flag3",doctor_name,flag);
                        }
                        if(order_id!==""){
                            if(unit.order_id!==order_id){
                                flag=0;
                            }
                            // console.log("why not flag4",order_id,flag);
                        }
                        if(start_date!==""){
                            let thisTime=new Date(unit.time);
                            let start_time=new Date(start_date);
                            if(thisTime.getTime()<start_time.getTime()){
                                flag=0;
                            }
                            console.log("why not flag5",start_time,thisTime,flag);
                        }
                        if(end_date!==""){
                            let thisTime=new Date(unit.time);
                            let end_time=new Date(end_date);
                            if(thisTime.getTime()>end_time.getTime()){
                                flag=0;
                            }
                            console.log("why not flag6",end_time,thisTime,flag);
                        }
                        // console.log("why not flag",flag);
                        if(flag===1){
                            return_list.push(unit);
                        }
                    }
                }
            };
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
