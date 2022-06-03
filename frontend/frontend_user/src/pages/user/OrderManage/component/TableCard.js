import React, {Component, useState} from 'react';
import {Form, Rate, Table} from "antd"
import { Modal, Button,message,Input } from 'antd';
import {StarFilled, StarOutlined} from "@ant-design/icons";
import api from "./../../../../commons/index"
import userapi from "./../../../../commons/components/userinfo"
import orderapi from "./../../../../commons/components/orderManage"

import cookie from "react-cookies";
import moment from "moment";
const { TextArea } = Input;
  const columns = [{
      title: '订单号',
      dataIndex: 'order_id',
      key: 'order_id',
  },
      {
    title: '科室',
    dataIndex: 'department',
    key: 'department',
  }, {
    title: '时间',
    dataIndex: 'time',
    key: 'time',
  }, {
    title: '订单状态',
    dataIndex: 'status',
    key: 'status',
  },{
    title: '医生',
    dataIndex: 'doctor_name',
    key: 'doctor_name',
  },
  //     {
  //     title: '病情简述',
  //     dataIndex: 'condition_description',
  //     key: 'condition_description',
  // },
      {
          title: '详情',
          dataIndex: 'detail',
          key: 'detail',
      }
      ];
function TableCard(props)  {
        // console.log("order manage,table props data",props)
        const tmpArr=[0];

        const [IsModalOpen,setIsModalOpen]=useState(new Array(props.orderList.length));
        const [icoStatus,setCollect]=useState(new Array(props.orderList.length));
        function setIsModalVisible(bool,idx){
            if(bool===true){
                let newArray=IsModalOpen.map(r=>false);
                newArray[idx]=true;
                setIsModalOpen(newArray);
            }else{
                let newArray=IsModalOpen.map(r=>false);
                newArray[idx]=false;
                setIsModalOpen(newArray);
            }
        }

    function onChangeComment(r) {
            console.log("comment=",r)
        orderapi.post_order_comment(cookie.load("user_id"),r.user.introduction).then(
            message.success("评论成功")
        )
    }

    return (
            <div >
                <Table dataSource={props.orderList.map((d,idx)=>{
                    // console.log("d.time",d.time);
                    let thisTime=new Date(d.time);
                        // console.log("d.time",thisTime);
                    return {
                        key: idx,
                        department: d.department,
                        time: d.time,
                        status: d.status,
                        order_id: d.order_id,
                        doctor_name: d.doctor_name,
                        detail:<div>
                            <Button type="primary" onClick={()=>setIsModalVisible(true,idx)}>
                                详情
                            </Button>

                            <Modal title="订单详情" visible={IsModalOpen[idx]}
                                   style={{height:400,width:500,
                                       // backgroundColor:'#bbd828'
                                   }}
                                   onOk={()=>setIsModalVisible(false,idx)}
                                   onCancel={()=>setIsModalVisible(false,idx)}>
                                <span style={{ marginLeft: '50px', marginBottom: '32px', lineHeight: '30px',fontSize:20}}>
                                    <p>用户姓名:&nbsp;&nbsp;&nbsp;{d.user_name}</p>
                                    <p>医生姓名:&nbsp;&nbsp;&nbsp;{d.doctor_name}
                                        <Button onClick={()=>{
                                            userapi.collect_doctor(cookie.load("user_name",d.doctor_id)).then(r=>{
                                                message.warning("收藏成功",r.data)
                                            })
                                        }}
                                                style={{position:"relative",top:5,left:10,backgroundColor:"#d5d7d7",borderRadius:3,borderColor:"white",height:30}}
                                        >

                                        收藏
                                        </Button>
                                    </p>
                                    <p>科室名称:&nbsp;&nbsp;&nbsp;{d.department}</p>
                                    <p>预约日期:&nbsp;&nbsp;&nbsp;{thisTime.getFullYear() + '-' + (thisTime.getMonth() + 1) + '-' + thisTime.getDate()}</p>
                                    <p>预约时间:&nbsp;&nbsp;&nbsp;{thisTime.getHours() + ':' + thisTime.getMinutes() + ':' + thisTime.getSeconds()}</p>
                                    <p>挂号费用:&nbsp;&nbsp;&nbsp;{d.payment?d.payment:"5.00"}
                                        <Button
                                            style={{position:"relative",top:5,left:10,backgroundColor:"#d5d7d7",borderRadius:3,borderColor:"white",height:30,display:d.status==="WAIT_BUYER_PAY"?"block":"none",cursor:d.status==="WAIT_BUYER_PAY"?"pointer":"not-allowed"}}
                                            onClick={()=>{
                                                if(d.status==="WAIT_BUYER_PAY"){
                                                    api.order_revoke(d.order_id,cookie.load("user_id")).then(
                                                        r=>{
                                                            message.success("订单取消成功")
                                                        }
                                                    )
                                                }else{
                                                    message.warning("订单无法取消")
                                                }

                                            }}
                                        >
                                    取消订单
                                </Button>
                                    </p>
                                </span>
                                <Form onFinish={onChangeComment}>
                                    <Form.Item name="rate" label="Rate">
                                        <Rate />
                                    </Form.Item>
                                    <Form.Item name={['user', 'introduction']} label="订单评论">
                                        <Input.TextArea rows={4} showCount maxLength={100}
                                                            />
                                    </Form.Item>
                                    <Form.Item >
                                        <Button type="primary" htmlType="submit" >
                                            Submit
                                        </Button>
                                    </Form.Item>
                                </Form>


                            </Modal>
                        </div>
                    }
                }
                )} columns={columns} />
            </div>
        );

}

export default TableCard;
