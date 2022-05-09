import './index.css';
import React from 'react';
import { Button } from 'antd';
import { Select } from 'antd';
import Result from './component/Result';

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