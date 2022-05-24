import './index.css';
import React from 'react';
import { Segmented } from 'antd';
import api from "./../../../commons/components/querydeparment"


import Infotype from './component/Infotype'


class Department extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            num:1,
            num1:1,
            data:{"name":"1"},
            data1:{
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
            }
        };
    }

    //require('./data/departstruct.json')

    componentDidMount(){
        api.getdepartstruct().then(r=>{
            this.setState(
                {
                    data:r.data.data
                }
            );
        });
        api.postdepartinfo("呼吸内科").then(r=>{
            this.setState(
                {
                    data1:r.data.data
                }
            );
        });
    }
    
 
    changeshow(name){
        let depart_struct=this.state.data;
        let depart_general_name = [];
        for(let i in depart_struct){
            depart_general_name.push(i);
        }
        let l = 0;
        for(let i in depart_struct){
            l = l+1;
            if(i === name){
                break;
            }
        } 
        this.setState(
            {
                num:l,
                num1:1
            }
        );
        //console.log(depart_struct[depart_general_name[l-1]]);
        let depart_detail_name = [];
        for(let i in depart_struct[depart_general_name[l-1]]){
            depart_detail_name.push(i);
            //console.log(i);
        }
        api.postdepartinfo(depart_detail_name[0]).then(r=>{
            this.setState(
                {
                    data1:r.data.data
                }
            );
        });
    }

    changeshow1(name){
        let depart_general_name = [];
        let depart_struct=this.state.data;
        for(let i in depart_struct){
            depart_general_name.push(i);
        }
        let Data = depart_struct[depart_general_name[this.state.num-1]];
        let l = 0;
        for(let i in Data){
            l = l+1;
            if(i === name){
                break;
            }
        } 
        this.setState(
            {
                num1:l
            }
        );
        api.postdepartinfo(name).then(r=>{
            this.setState(
                {
                    data1:r.data.data
                }
            );
        });
    }

    render(){
        /*
        api.getdepartstruct().then(r=>{
            a = r.data.data;
            //console.log(2);
        });
        */
        let depart_general_name = [];
        //console.log(1);
        let depart_struct=this.state.data;
        for(let i in depart_struct){
            depart_general_name.push(i);
        }

        let Data = depart_struct[depart_general_name[this.state.num-1]];
        let depart_name = [];
        for(let i in Data){
            depart_name.push(i);
        }

        //console.log(this.state.num);
        //console.log(depart_name[this.state.num1-1]);

        return  (
            <div>
                <Segmented size="middle" key={depart_general_name[0]} options={depart_general_name} defaultValue={depart_general_name[0]} onChange={value=>this.changeshow(value)}/>
                {/*<Struct data={depart_struct[depart_general_name[this.state.num-1]]}></Struct>*/}
                <p></p>
                <Segmented size="middle" key={depart_name[0]} options={depart_name} defaultValue={depart_name[0]} onChange={value=>this.changeshow1(value)}/>
                <p></p>
                <Infotype data1={this.state.data1} data={depart_struct[depart_general_name[this.state.num-1]][depart_name[this.state.num1-1]]} depart={depart_name[this.state.num1-1]}></Infotype>
            </div>
        )

    }
  
}


export default Department;