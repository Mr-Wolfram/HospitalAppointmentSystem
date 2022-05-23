import './index.css';
import React from 'react';
import { Segmented } from 'antd';


import Infotype from './component/Infotype';

class Department extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            num: 1,
            num1:1
        };
    }


    changeshow(name){
        let depart_struct=require('./data/departstruct.json');
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
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        get
            .then(
                setSta
            )
    }
    changeshow1(name){
        let depart_general_name = [];
        let depart_struct=require('./data/departstruct.json');
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
    }

    render(){
        let depart_general_name = [];
        let depart_struct=require('./data/departstruct.json');
        for(let i in depart_struct){
            depart_general_name.push(i);
        }

        let Data = depart_struct[depart_general_name[this.state.num-1]];
        let depart_name = [];
        for(let i in Data){
            depart_name.push(i);
        }

        //console.log(this.state.num);

        return  (
            <div>
                <h2>科室浏览</h2>
                <Segmented size="middle" key={depart_general_name[0]} options={depart_general_name} defaultValue={depart_general_name[0]} onChange={value=>this.changeshow(value)}/>
                {/*<Struct data={depart_struct[depart_general_name[this.state.num-1]]}></Struct>*/}
                <p></p>
                <Segmented size="middle" key={depart_name[0]} options={depart_name} defaultValue={depart_name[0]} onChange={value=>this.changeshow1(value)}/>
                <p></p>
                <Infotype data={depart_struct[depart_general_name[this.state.num-1]][depart_name[this.state.num1-1]]}></Infotype>
            </div>
        )

    }

}


export default Department;
