import '../index.css';
import React from 'react';
import { Descriptions } from 'antd';
import { Button } from 'antd';
import { Table } from 'antd';
import { Modal } from 'antd';
import api from './../../../../commons/components/querydeparment'

class Time extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
            person: '张三',
            depart:"",
            data:{
                "number":2,
                "doctor_list":[
                    {},
                    {}
                ]
            }
        };
    }
    /*
    componentDidMount(){
        api.getdoctorinfo(this.state.person,this.props.depart).then(r=>{
            this.setState(
                {
                    data:r.data.data
                }
            );
        });
    }
    */

    showModal(name){
        this.setState(
            {
                isModalVisible:true,
                person: name,
            }
        );
        api.getdoctorinfo(name,this.props.depart).then(r=>{
            this.setState(
                {
                    data:r.data.data
                }
            );
        });
    }

    handleOk(){
        this.setState(
            {
                isModalVisible:false
            }
        );
    }

    handleCancel(){
        this.setState(
            {
                isModalVisible:false
            }
        );
    }

    getbutton(arr){
        if(typeof(arr) == 'string'){
            return <Button type='text' onClick={()=>this.showModal(arr)}>{arr}</Button>
        }else{
            return (
                <>
                    {
                        arr.map(Item=>{
                            return <Button type='text' onClick={()=>this.showModal(Item)}>{Item}</Button>
                        })
                    }
                </>
            )
        }
    }

    render(){
        //console.log(this.props.data);
        const columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '科室',
                dataIndex: 'department',
                key: 'departmen',
            },
            {
                title: '年龄',
                dataIndex: 'age',
                key: 'age',
            },
            {
                title: '简介',
                dataIndex: 'intro',
                key: 'intro',
            },
        ];

        let Data = this.props.data;
        let detailinfo = [];
        let person_info=this.state.data;    //读入json
        for(let i=0;i<person_info.number;i++){
            detailinfo.push(person_info.doctor_list[i]);
        }

        return (
            <> 
                {
                    <Descriptions size='small' title={''} column={1} bordered={false}>
                        {
                            <>
                                <Descriptions.Item label="上午">{this.getbutton(Data.上午)}</Descriptions.Item>
                                <Descriptions.Item label="下午">{this.getbutton(Data.下午)}</Descriptions.Item>
                            </>
                        }
                    </Descriptions>
                    
                }
                <Modal width={700} key={person_info.doctor_list[0].name} title="医生个人信息" visible={this.state.isModalVisible} onOk={() =>this.handleOk()} onCancel={()=> this.handleCancel()}>
                    <Table key={person_info.doctor_list[0].name} columns={columns} dataSource={detailinfo} size="small"></Table>
                </Modal>
            </>
        )
    }
}

export default Time;