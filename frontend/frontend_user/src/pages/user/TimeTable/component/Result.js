import '../index.css';
import React from 'react';
import Schedule from './Schedule';
import api from './../../../../commons/components/querydeparment'

class Result extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            num: 1,
            /*data:{
                "data_info":["2022-04-18_1","2022-04-20_3"],
                "周一":{
                   
                },
                "周三":{
                    
                }
            }*/
        };
    }
/*
    componentDidMount(){
        api.getqueryschdule().then(r=>{
            this.setState(
                {
                    data:r.data.data
                }
            );
        });
    }
*/

    getnum(time){
        let Data=this.props.data;
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
        //console.log(this.props.day);
        //console.log(11111111111);
        //console.log(this.props.depart);
        let Data=this.props.data;
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
                                <h3>{Item}</h3>
                                <Schedule depart={this.props.depart} data={Data[type[this.getnum(Item)-1]]}></Schedule>
                            </>
                        )
                    })
                }
            </>
        )
    }
}

export default Result;