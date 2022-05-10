import '../index.css';
import React from 'react';
import { Segmented } from 'antd';

import Showtype from './Showtype';

class Infotype extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            type: '简介'
        };
    }

    changeshow(name){
        this.setState(
            {
                type: name
            }
        );
    }

    render(){
        let people = this.props.data;
        let department_detailinfo = require('../data/departinfo.json');

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