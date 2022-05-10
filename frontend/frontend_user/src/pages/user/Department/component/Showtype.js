import React from 'react';
import '../index.css';
import { Descriptions } from 'antd';
import { Button } from 'antd';
import { Table } from 'antd';
import { Modal } from 'antd';


class Showtype extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
            person: '张三'
        };
    }

    showModal(name){
        this.setState(
            {
                isModalVisible:true,
                person: name
            }
        );
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
        //console.log(this.props.showtype)
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
        
        let doctorinfo = this.props.personinfo;
        let index = [];
        for(let i in doctorinfo){
            index.push(i);
        }
        let departmentinfo = this.props.departmentinfo;
        let detailinfo = [];
        let person_info=require('../data/doctorinfo.json');    //读入json
        for(let i=0;i<person_info.number;i++){
            detailinfo.push(person_info.doctor_list[i]);
        }

        //console.log(typeof(doctorinfo.主任));

        if(this.props.showtype === '简介'){
            //return <p>简介</p>
            return (
                <>
                <Descriptions size='small' title={''} column={1} bordered>
                    <Descriptions.Item label="科室名称">{departmentinfo.name}</Descriptions.Item>
                    <Descriptions.Item label="简介">{departmentinfo.intro}</Descriptions.Item>
                    <Descriptions.Item label="医生">
                        {
                            this.getbutton(departmentinfo.doctor_list)
                        }
                    </Descriptions.Item>
                </Descriptions>
                <Modal width={700} key={person_info.doctor_list[0].name} title="医生个人信息" visible={this.state.isModalVisible} onOk={() =>this.handleOk()} onCancel={()=> this.handleCancel()}>
                    <Table key={person_info.doctor_list[0].name} columns={columns} dataSource={detailinfo}></Table>
                </Modal>
                </>
            )
        }else if(this.props.showtype === '人员'){
            //return <p>人员</p>
            return (
                <>
                <Descriptions size='small' title={''} column={1} bordered>
                    <Descriptions.Item label="主任">
                        {
                            this.getbutton(doctorinfo["主任"])
                        }
                    </Descriptions.Item>
                    <Descriptions.Item label="副主任">
                        {
                            this.getbutton(doctorinfo["副主任"])
                        }
                    </Descriptions.Item>
                    <Descriptions.Item label="主治医师">
                        {
                            this.getbutton(doctorinfo["主治医师"])
                        }
                    </Descriptions.Item>
                </Descriptions>
                <Modal width={700} key={person_info.doctor_list[0].name} title="医生个人信息" visible={this.state.isModalVisible} onOk={() =>this.handleOk()} onCancel={()=> this.handleCancel()}>
                    <Table key={person_info.doctor_list[0].name} columns={columns} dataSource={detailinfo}></Table>
                </Modal>
                </>
            )
        }else if(this.props.showtype === '时间表'){
            //return <p>时间表</p>
            return (
                <>
                <Descriptions size='small' title={''} column={2} bordered>
                            <Descriptions.Item label="周一上午">{this.getbutton(departmentinfo.schedule.周一.上午)}</Descriptions.Item>
                            <Descriptions.Item label="周一下午">{this.getbutton(departmentinfo.schedule.周一.下午)}</Descriptions.Item>
                            <Descriptions.Item label="周二上午">{this.getbutton(departmentinfo.schedule.周二.上午)}</Descriptions.Item>
                            <Descriptions.Item label="周二下午">{this.getbutton(departmentinfo.schedule.周二.下午)}</Descriptions.Item>
                            <Descriptions.Item label="周三上午">{this.getbutton(departmentinfo.schedule.周三.上午)}</Descriptions.Item>
                            <Descriptions.Item label="周三下午">{this.getbutton(departmentinfo.schedule.周三.下午)}</Descriptions.Item>
                            <Descriptions.Item label="周四上午">{this.getbutton(departmentinfo.schedule.周四.上午)}</Descriptions.Item>
                            <Descriptions.Item label="周四下午">{this.getbutton(departmentinfo.schedule.周四.下午)}</Descriptions.Item>
                            <Descriptions.Item label="周五上午">{this.getbutton(departmentinfo.schedule.周五.上午)}</Descriptions.Item>
                            <Descriptions.Item label="周五下午">{this.getbutton(departmentinfo.schedule.周五.下午)}</Descriptions.Item>
                            <Descriptions.Item label="周六上午">{this.getbutton(departmentinfo.schedule.周六.上午)}</Descriptions.Item>
                            <Descriptions.Item label="周六下午">{this.getbutton(departmentinfo.schedule.周六.下午)}</Descriptions.Item>
                            <Descriptions.Item label="周日上午">{this.getbutton(departmentinfo.schedule.周日.上午)}</Descriptions.Item>
                            <Descriptions.Item label="周日下午">{this.getbutton(departmentinfo.schedule.周日.下午)}</Descriptions.Item>
                </Descriptions>
                <Modal width={700} key={person_info.doctor_list[0].name} title="医生个人信息" visible={this.state.isModalVisible} onOk={() =>this.handleOk()} onCancel={()=> this.handleCancel()}>
                    <Table key={person_info.doctor_list[0].name} columns={columns} dataSource={detailinfo}></Table>
                </Modal>
                </>
            )
        }else{
            //return <p>请选择</p>
        }
    }
}

export default Showtype;