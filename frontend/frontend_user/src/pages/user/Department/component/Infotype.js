import '../index.css';
import React from 'react';
import { Segmented } from 'antd';
import api from "./../../../../commons/components/querydeparment"

import Showtype from './Showtype';

class Infotype extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            type: '简介',
            /*depart:"呼吸内科",
            data:{
                "name":"",
                "intro":"",
                "doctor_list":["","",""],
                "schedule":{
                    "周一":{},
                    "周二":{},
                    "周三":{},
                    "周四":{},
                    "周五":{},
                    "周六":{},
                    "周日":{},
                }
            }*/
        };
    }

    //require('../data/departinfo.json')

/*
    componentDidMount(){
        api.postdepartinfo(this.state.depart).then(r=>{
            this.setState(
                {
                    data:r.data.data
                }
            );
        });
        //console.log(this.state.depart);
    }
    */
/*
    shouldComponentUpdate(nextProps,nextState){
        //console.log(nextProps.depart);
        //console.log(nextState.depart);
        if(nextProps.depart === this.state.depart && nextState.type === this.state.type){
            return false;
        }
        return true;
    }

    componentDidUpdate(){
        this.setState(
            {
                depart:this.props.depart
            }
        );
        //console.log(this.state.depart);
        api.postdepartinfo(this.props.depart).then(r=>{
            this.setState(
                {
                    data:r.data.data
                }
            );
        });
    }
*/

    changeshow(name){
        this.setState(
            {
                type: name
            }
        );
    }



    render(){
        let people = this.props.data;
        let department_detailinfo = this.props.data1;

        //console.log(this.props.depart);

        //console.log(this.state.type);

        return (
            <div>
                <Segmented size="middle" options={['简介','人员','时间表']} onChange={value=>this.changeshow(value)}/>
                <Showtype personinfo={people} departmentinfo={department_detailinfo} showtype={this.state.type}></Showtype>
            </div>
        )
    }
}
export default Infotype;