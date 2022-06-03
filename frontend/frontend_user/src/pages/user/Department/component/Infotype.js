import '../index.css';
import React from 'react';
import { Row, Segmented,Tabs  } from 'antd';
import api from "./../../../../commons/components/querydeparment"

import Showtype from './Showtype';


const { TabPane } = Tabs;

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

        //console.log(this.props.isshow);

        //console.log(this.state.type);

        return (
            <div>
                {/*
                <Row >
                    <Segmented className='seg' size="middle" options={['简介','人员','时间表']} onChange={value=>this.changeshow(value)}/>
                </Row>
                */}
                <Row style={{'margin':'0cm 0cm 0cm 4cm'}}>
                <Tabs className='down' defaultActiveKey="1" onChange={value=>this.changeshow(value)}>
                    <TabPane tab="简介" key="简介" >
                     
                    </TabPane>
                    <TabPane tab="人员" key="人员" disabled={this.props.isshow}>
                      
                    </TabPane>
                    <TabPane tab="时间表" key="时间表" >
                      
                    </TabPane>
                </Tabs>
                </Row>
                <p></p>
                <Row  justify='center'>
                    <Showtype name={this.props.name} personinfo={people} departmentinfo={department_detailinfo} showtype={this.state.type}></Showtype>
                </Row>
            </div>
        )
    }
}
export default Infotype;