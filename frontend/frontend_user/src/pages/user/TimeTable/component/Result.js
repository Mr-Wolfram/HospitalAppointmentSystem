import '../index.css';
import React from 'react';
import Schedule from './Schedule';

class Result extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            num: 1,
        };
    }

    getnum(time){
        let Data=require('../data/query_schdule.json');
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
        let Data=require('../data/query_schdule.json');
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
                                <Schedule data={Data[type[this.getnum(Item)-1]]}></Schedule>
                            </>
                        )
                    })
                }
            </>
        )
    }
}

export default Result;