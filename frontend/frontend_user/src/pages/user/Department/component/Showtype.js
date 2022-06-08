import React from 'react';
import './../index.css';
import { Descriptions } from 'antd';
import { Button } from 'antd';
import { Table } from 'antd';
import { Modal,Spin } from 'antd';
import api from "./../../../../commons/components/querydeparment"
import Item from 'antd/lib/list/Item';


class Showtype extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
            depart:"",
            person: '张三',
            data:{
                "number":"",
                "doctor_list":[
                    {},
                    {}
                ]
            }
        };
    }
    /*
    componentDidMount(){
        api.getdoctorinfo(this.state.person,this.props.departmentinfo.name).then(r=>{
            this.setState(
                {
                    data:r.data.data
                }
            );
        });
    }
    */
/*
    shouldComponentUpdate(nextProps,nextState){
        if(this.state.person != nextState.person){
            return true;
        }else{
            return false;
        }
    }

    componentDidUpdate(){
        api.getdoctorinfo(this.state.person).then(r=>{
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
                depart:this.props.departmentinfo.name
            }
        );
        api.getdoctorinfo(name,this.props.departmentinfo.name).then(r=>{
            //console.log(r.data.data);
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

    get_time_table(value){
        //console.log(value);
        let week = [];
        let a;
        for(let i in value){
            week.push(i);
        }
        return (
            <>
                {
                    week.map(Item=>{
                        return this.get_detail(Item,value[Item]);
                    })
                }
            </>
        );
    }

    get_detail(week,people){
        //console.log(week);
        //console.log(people);
        let time = [];
        for(let i in people){
            time.push(i);
        }
        return (
            <>
                {
                    time.map(Item=>{
                        return <Descriptions.Item label={week+Item}>{
                            this.getbutton(people[Item])
                        }</Descriptions.Item>
                    })
                }
            </>
        );
    }

    getpeople(value){
        let position = [];
        for(let i in value){
            position.push(i);
        }
        return (
            <>
                {
                    position.map(Item=>{
                        return <Descriptions.Item label={Item}>{
                            this.getbutton(value[Item])
                        }</Descriptions.Item>
                    })
                }
            </>
        );
    }

    render(){
        //console.log(this.props.departmentinfo);
        //console.log(this.props.personinfo);
        //console.log(this.props.name);
        const columns = [
            {
                title: 'ID',
                dataIndex: 'doctor_id',
                key: 'doctor_id',
            },
            {
                title: '姓名',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '科室',
                dataIndex: 'department',
                key: 'department',
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
        let person_info=this.state.data;    //读入json
        for(let i=0;i<person_info.number;i++){
            detailinfo.push(person_info.doctor_list[i]);
        }

        //console.log(typeof(doctorinfo.主任));

        if(this.props.showtype === '简介'){
            //return <p>简介</p>
            return (
                <>
                <Descriptions className='table' contentStyle={{'textAlign':'center'}} labelStyle={{'width':'10%','textAlign':'center'}} size='middle' title={''} column={1} bordered={true}>
                    <Descriptions.Item label="科室名称">{this.props.name}</Descriptions.Item>
                    <Descriptions.Item label="简介">
                        {
                            (this.props.isspan)?((departmentinfo === undefined)?"":departmentinfo.intro):<Spin />
                        }
                    </Descriptions.Item>
                    <Descriptions.Item label="医生">
                        {
                            (this.props.isspan)?((departmentinfo === undefined)?"":this.getbutton(departmentinfo.doctor_list)):<Spin />
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
                <Descriptions className='table' contentStyle={{'textAlign':'center'}} labelStyle={{'width':'10%','textAlign':'center'}} size='small' title={''} column={1} bordered>
                    {/*
                    <Descriptions.Item label="主任医师">
                        {
                            this.getbutton(doctorinfo["主任医师"])
                        }
                    </Descriptions.Item>
                    <Descriptions.Item label="副主任医师">
                        {
                            this.getbutton(doctorinfo["副主任医师"])
                        }
                    </Descriptions.Item>
                    <Descriptions.Item label="主治医师">
                        {
                            this.getbutton(doctorinfo["主治医师"])
                        }
                    </Descriptions.Item>
                    */}
                    {this.getpeople(doctorinfo)}
                </Descriptions>
                <Modal width={700} key={person_info.doctor_list[0].name} title="医生个人信息" visible={this.state.isModalVisible} onOk={() =>this.handleOk()} onCancel={()=> this.handleCancel()}>
                    <Table key={person_info.doctor_list[0].name} columns={columns} dataSource={detailinfo}></Table>
                </Modal>
                </>
            )
        }else if(this.props.showtype === '时间表'){
            //return <p>时间表</p>
            
            return (
                (this.props.isspan)?
                (<>
                <Descriptions contentStyle={{'textAlign':'center'}} labelStyle={{'width':'10%','textAlign':'center'}} className='table' size='small' title={''} column={2} bordered>
                            {/*<Descriptions.Item label="周一上午">{this.getbutton(departmentinfo.schedule.星期一.上午)}</Descriptions.Item>
                            <Descriptions.Item label="周一下午">{this.getbutton(departmentinfo.schedule.星期一.下午)}</Descriptions.Item>
                            <Descriptions.Item label="周二上午">{this.getbutton(departmentinfo.schedule.星期二.上午)}</Descriptions.Item>
                            <Descriptions.Item label="周二下午">{this.getbutton(departmentinfo.schedule.星期二.下午)}</Descriptions.Item>
                            <Descriptions.Item label="周三上午">{this.getbutton(departmentinfo.schedule.星期三.上午)}</Descriptions.Item>
                            <Descriptions.Item label="周三下午">{this.getbutton(departmentinfo.schedule.星期三.下午)}</Descriptions.Item>
                            <Descriptions.Item label="周四上午">{this.getbutton(departmentinfo.schedule.星期四.上午)}</Descriptions.Item>
                            <Descriptions.Item label="周四下午">{this.getbutton(departmentinfo.schedule.星期四.下午)}</Descriptions.Item>
                            <Descriptions.Item label="周五上午">{this.getbutton(departmentinfo.schedule.星期五.上午)}</Descriptions.Item>
                            <Descriptions.Item label="周五下午">{this.getbutton(departmentinfo.schedule.星期五.下午)}</Descriptions.Item>
                            <Descriptions.Item label="周六上午">{this.getbutton(departmentinfo.schedule.星期六.上午)}</Descriptions.Item>
                            <Descriptions.Item label="周六下午">{this.getbutton(departmentinfo.schedule.星期六.下午)}</Descriptions.Item>*
                            <Descriptions.Item label="周日上午">{this.getbutton(departmentinfo.schedule.星期日.上午)}</Descriptions.Item>
                            <Descriptions.Item label="周日下午">{this.getbutton(departmentinfo.schedule.星期日.下午)}</Descriptions.Item>*/}
                            {this.get_time_table(departmentinfo.schedule)}
                </Descriptions>
                <Modal width={700} key={person_info.doctor_list[0].name} title="医生个人信息" visible={this.state.isModalVisible} onOk={() =>this.handleOk()} onCancel={()=> this.handleCancel()}>
                    <Table key={(person_info.number === 0)?0:person_info.doctor_list[0].name} columns={columns} dataSource={detailinfo}></Table>
                </Modal>
                </>):''
            )
        }else{
            //return <p>请选择</p>
        }
    }
}

export default Showtype;