import './index.css';
import React from 'react';
import { Button } from 'antd';
import { Select } from 'antd';
import Result from './component/Result';
import api from './../../../commons/components/querydeparment'

class TimeTable extends React.Component{
    constructor(props){
        super(props);
        this.state={
            size: "default",
            general: "",
            d:require('./data/big_depart_json.json'),
            depart:[],
            day:[""],
            isShow:false,
            data:{"name":"1"},
            data1:{
                "data_info":[]
            }
        }
    }

    componentDidMount(){
        api.getdepartstruct().then(r=>{
            this.setState(
                {
                    data:r.data.data
                }
            );
        });
    }

    display(){
        this.setState(
            {
                isShow:true
            }
        );
        api.postqueryschdule(this.state.day,this.state.depart).then(r=>{
            console.log(r.data.data);
            this.setState(
                {
                    data1:r.data.data
                }
            );
        });
    }

    handleday(value){
        //console.log(`Selected: ${value}`);
        this.setState(
            {
                day:value
            }
        );
        //console.log(this.state.day);
    }

    handledepart(value){
        //console.log(`Selected: ${value}`);
        this.setState(
            {
                depart:value
            }
        );
    }

    handleChange(value){
        //console.log(`Selected: ${value}`);
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

        let Data=this.state.d;
        let depart_general = [];
        for(let i in Data){
            depart_general.push(<Option key={i}>{i}</Option>);
        }

        const depart_detail = [];
        for(let i in Data[this.state.general]){
            depart_detail.push(<Option key={Data[this.state.general][i]}>{Data[this.state.general][i]}</Option>);
        }
        
        return (
            <>
                
                <br />
                <Select size={this.state.size} placeholder="请选择想要查询的大类（单选）"  onChange={value=>this.handleChange(value)} style={{ width: 200 }}>
                    {depart_general}
                </Select>
                <br />
                <p />
                <Select
                    mode="multiple"
                    size={this.state.size}
                    placeholder="请选择想要查询的科室（多选）"
                    onChange={value=>this.handledepart(value)}
                    style={{ width: '90%' }}
                >
                    {depart_detail}
                </Select>
                <br />
                <p />
                <Select
                    mode="tags"
                    size={this.state.size}
                    placeholder="请选择想要查询的日期（多选）"
                    onChange={value=>this.handleday(value)}
                    style={{ width: '90%' }}
                >
                    {week}
                </Select>
                <br />
                <p />
                <Button type='primary' onClick={()=>this.display()} >查询</Button>
                <p />
                {
                    this.state.isShow !== false&&<Result data={this.state.data1} day={this.state.day} depart={this.state.depart}></Result>
                }
            </>
        );
    }
}

export default TimeTable;