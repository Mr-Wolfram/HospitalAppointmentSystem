import './index.css';
import React from 'react';
import { Descriptions } from 'antd';
import { Button } from 'antd';
import { Table } from 'antd';
import { Modal } from 'antd';
import { Select } from 'antd';


class Time extends React.Component{
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
        let person_info=require('./data/doctorinfo.json');    //读入json
        for(let i=0;i<person_info.number;i++){
            detailinfo.push(person_info.doctor_list[i]);
        }

        return (
            <> 
                {
                    <Descriptions size='small' title={''} column={1}>
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

class Schedule extends React.Component{
    render(){
        let Data = this.props.data;
        let depart = [];
        for(let i in Data){
            depart.push(i);
        }
        //console.log(depart);
        return (
            <>
            {
                <Descriptions size='small' bordered={true} title={''} column={1}>
                    {
                        depart.map(Item=>{
                            return (
                            <Descriptions.Item label={Item}>
                                {
                                    <Time data={Data[Item]}></Time>
                                }
                            </Descriptions.Item>
                            )
                        })
                    }
                </Descriptions>
            }
            </>
        )
    }
}

class Result extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            num: 1,
        };
    }

    getnum(time){
        let Data=require('./data/query_schdule.json');
        var count = 0;
        let arr = [];
        for(let i in Data.data_info){
            arr.push(Data.data_info[i]);
        }
        for(let i=0;i<arr.length;i++){
            count++;
            if(arr[i] === time){
                break;
            }
        }
        return count;
    }

    render(){
        let Data=require('./data/query_schdule.json');
        //console.log(Data.data_info);
        let type = [];
        for(let i in Data){
            if(i !== "data_info"){
                type.push(i);
            }
        }
        //console.log(type);

        return (
            <>
                {
                    Data.data_info.map(Item=>{
                        return (
                            <>
                                <h2>{Item}</h2>
                                <Schedule data={Data[type[this.getnum(Item)-1]]}></Schedule>
                            </>
                        )
                    })
                }
            </>
        )
    }
}

class TimeTable extends React.Component{
    constructor(props){
        super(props);
        this.state={
            size: "default",
            general: "内科",
            depart:[],
            day:[],
            isShow:false
        }
    }

    display(){
        this.setState(
            {
                isShow:true
            }
        )
    }

    handleday(value){
        console.log(`Selected: ${value}`);
    }

    handledepart(value){
        console.log(`Selected: ${value}`);
    }

    handleChange(value){
        console.log(`Selected: ${value}`);
        //console.log(typeof(value));
        this.setState(
            {
                general:value
            }
        );
    }

    render(){
        const { Option } = Select;

        const week = [];
        week.push(<Option key="周一">周一</Option>);
        week.push(<Option key="周二">周二</Option>);
        week.push(<Option key="周三">周三</Option>);
        week.push(<Option key="周四">周四</Option>);
        week.push(<Option key="周五">周五</Option>);
        week.push(<Option key="周六">周六</Option>);
        week.push(<Option key="周日">周日</Option>);

        let Data=require('./data/departstruct.json');
        let depart_general = [];
        for(let i in Data){
            depart_general.push(<Option key={i}>{i}</Option>);
        }

        const depart_detail = [];
        for(let i in Data[this.state.general]){
            depart_detail.push(<Option key={i}>{i}</Option>);
        }
        
        return (
            <>
                <h2>时间表查询</h2>
                <br />
                <Select size={this.state.size} placeholder="请选择想要查询的大类（单选）"  onChange={value=>this.handleChange(value)} style={{ width: 200 }}>
                    {depart_general}
                </Select>
                <br />
                <Select
                    mode="multiple"
                    size={this.state.size}
                    placeholder="请选择想要查询的科室（多选）"
                    onChange={this.handledepart}
                    style={{ width: '100%' }}
                >
                    {depart_detail}
                </Select>
                <br />
                <Select
                    mode="tags"
                    size={this.state.size}
                    placeholder="请选择想要查询的日期（多选）"
                    onChange={this.handleday}
                    style={{ width: '100%' }}
                >
                    {week}
                </Select>
                <Button type='primary' onClick={()=>this.display()} >查询</Button>
                {
                    this.state.isShow !== false&&<Result depart={this.state.depart} day={this.state.day}></Result>
                }
            </>
        );
    }
}

export default TimeTable;