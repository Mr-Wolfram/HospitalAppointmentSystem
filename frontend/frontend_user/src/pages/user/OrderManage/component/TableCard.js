import React, {Component} from 'react';
import {Table} from "antd"
const dataSource = [{
    key: '1',
    name: '内科',
    age: "2022-01-03",
    address: '完成',
    doctor:'张三'
  }, {
    key: '2',
    name: '外科',
    age: '2022-04-25',
    address: '待支付',
    doctor:'李燕'
  },{
    key: '3',
    name: '外科',
    age: '2022-04-24',
    address: '完成',
    doctor:'王威'
  },
];
  
  const columns = [{
    title: '科室',
    dataIndex: 'name',
    key: 'name',
  }, {
    title: '时间',
    dataIndex: 'age',
    key: 'age',
  }, {
    title: '订单状态',
    dataIndex: 'address',
    key: 'address',
  },{
    title: '医生',
    dataIndex: 'doctor',
    key: 'doctor',
  }];
class TableCard extends Component {
    
      
      
    render () {
        return (
            <div >
                <Table dataSource={dataSource} columns={columns} />
            </div>
        );
    }
}

export default TableCard;