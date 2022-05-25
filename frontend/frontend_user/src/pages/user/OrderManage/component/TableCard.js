import React, {Component, useState} from 'react';
import {Table} from "antd"
import { Modal, Button } from 'antd';
import {StarFilled, StarOutlined} from "@ant-design/icons";

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
  },{
      title: '病情简述',
      dataIndex: 'condition_description',
      key: 'condition_description',
  },{
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
                            <Modal title="订单详情" visible={IsModalOpen[idx]} onOk={()=>setIsModalVisible(false,idx)}
                                   onCancel={()=>setIsModalVisible(false,idx)}>
                                <p>用户姓名:{d.user_name}</p>
                                <p>医生姓名:{d.doctor_name}</p>
                                <p>科室:{d.department}</p>
                                <p>预约日期:{thisTime.getFullYear() + '-' + (thisTime.getMonth() + 1) + '-' + thisTime.getDate()}</p>
                                <p>预约时间:{thisTime.getHours() + ':' + thisTime.getMinutes() + ':' + thisTime.getSeconds()}</p>
                                <p>挂号费:{d.payment?d.payment:"6.00"}</p>
                                {/*{tmpArr.map(r=>{*/}
                                {/*    if(icoStatus[idx]){return <StarOutlined onClick={(e) =>{*/}
                                {/*        // console.log("dsd")*/}
                                {/*        let newArr=icoStatus;*/}
                                {/*        newArr[idx]=!icoStatus[idx];*/}
                                {/*        setCollect(newArr);*/}
                                {/*    }} />}*/}
                                {/*    else {*/}
                                {/*        return <StarFilled onClick={(e) =>{*/}
                                {/*            // console.log("dsdcds")*/}
                                {/*            let newArr=icoStatus;*/}
                                {/*            newArr[idx]=!icoStatus[idx];*/}
                                {/*            setCollect(newArr);*/}
                                {/*            // console.log(newArr);*/}
                                {/*        }} />*/}
                                {/*    }*/}
                                {/*})}*/}
                            </Modal>
                        </div>
                    }
                }
                )} columns={columns} />
            </div>
        );

}

export default TableCard;
