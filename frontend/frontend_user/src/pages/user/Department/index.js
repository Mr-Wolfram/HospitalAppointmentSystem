import './index.css';
import React from 'react';
import { Row, Segmented,Tabs } from 'antd';
import api from "./../../../commons/components/querydeparment"


import Infotype from './component/Infotype'


const { TabPane } = Tabs;

class Department extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            num:1,
            num1:1,
            name:'',
            d:require('./data/big_depart_json.json'),
            data:1,
            data1:{
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
            },
            count:1
        };
    }

    //require('./data/departstruct.json')

    componentDidMount(){       
        api.getdepartstruct().then(r=>{
            console.log(r.data.data);
            this.setState(
                {
                    name:'口腔内科',
                    data:r.data.data,
                }
            );
        });
        
        api.getdepartinfo("口腔内科").then(r=>{
            this.setState(
                {
                    data1:r.data.data,
                    count:2,
                    name:"口腔内科"
                }
            );
        });
        
    }
    
 
    changeshow(name){
        let depart_struct=this.state.d;
        let depart_general_name = [];
        for(let i in depart_struct){
            depart_general_name.push(i);
        }
        let l = 0;
        for(let i in depart_struct){
            l = l+1;
            if(i == name){
                break;
            }
        } 
        this.setState(
            {
                num:l,
                num1:1,
                name:depart_struct[depart_general_name[l-1]][0]
            }
        );
        //console.log(depart_struct[depart_general_name[l-1]]);
        /*
        let depart_detail_name = [];
        for(let i in depart_struct[depart_general_name[l-1]]){
            depart_detail_name.push(i);
            //console.log(i);
        }
        */
        let depart_detail_name = depart_struct[depart_general_name[l-1]];
        api.getdepartinfo(depart_detail_name[0]).then(r=>{
            this.setState(
                {
                    data1:r.data.data,
                    count:2,
                }
            );
        });
    }

    changeshow1(name){
        let depart_general_name = [];
        let depart_struct=this.state.d;
        for(let i in depart_struct){
            depart_general_name.push(i);
        }
        let Data = depart_struct[depart_general_name[this.state.num-1]];
        let l = 0;
        for(let i in Data){
            l = l+1;
            if(Data[i] === name){
                break;
            }
        } 
        this.setState(
            {
                num1:l,
                name:name
            }
        );
        api.getdepartinfo(name).then(r=>{
            this.setState(
                {
                    data1:r.data.data,
                    count:2,
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
        //console.log(this.state.data1);
        let depart_general_name = [];
        let depart_struct=this.state.d;
        for(let i in depart_struct){
            depart_general_name.push(i);
        }
        //console.log(depart_general_name);
        let Data = depart_struct[depart_general_name[this.state.num-1]];
        let a = this.state.data;
        /*
        let depart_name = [];
        for(let i in Data){
            depart_name.push(i);
        }
        */
        //console.log(this.state.num);
        //console.log(depart_name[this.state.num1-1]);

        return  (
            <div>
                {/*
                <Row justify='center'>
                    <Segmented className='seg' size="middle" key={depart_general_name[0]} options={depart_general_name} defaultValue={depart_general_name[0]} onChange={value=>this.changeshow(value)}/>
                </Row>
                */}
                <Row style={{'margin':'0cm 0cm 0cm 2cm'}}>
                    <Tabs defaultActiveKey={depart_general_name[0]} onChange={value=>this.changeshow(value)}>{
                        depart_general_name.map(Item=>{
                            return <TabPane tab={<div className='top'>{Item}</div>} key={Item} disabled={(this.state.count === 1)?true:false}></TabPane>
                        })
                    }
                    </Tabs>
                </Row>
                
                <p></p>
                {/*
                <Row justify='center'>
                    <Segmented className='seg' size="middle" key={depart_name[0]} options={depart_name} defaultValue={depart_name[0]} onChange={value=>this.changeshow1(value)}/>
                </Row>
                */}
                <Row style={{'margin':'0cm 0cm 0cm 2cm'}}>
                    <Tabs defaultActiveKey={Data[0]} activeKey={Data[this.state.num1-1]} onChange={value=>this.changeshow1(value)}>{
                        Data.map(Item=>{
                            return <TabPane tab={<div className='mid'>{Item}</div>} key={Item} disabled={(this.state.count === 1)?true:false}></TabPane>
                        })
                    }
                    </Tabs>
                </Row>


                <p></p>
                <Infotype isshow={(this.state.data === 1)?true:false} name={this.state.name} data1={this.state.data1} data={a[Data[this.state.num1-1]]} depart={Data[this.state.num1-1]}></Infotype>
            </div>
        )

    }
  
}


export default Department;