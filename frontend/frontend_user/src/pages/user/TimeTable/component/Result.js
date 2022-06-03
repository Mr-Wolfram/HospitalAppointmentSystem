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

    tran(str){
        switch(str){
            case "星期一": return 1;
            case "星期二": return 2;
            case "星期三": return 3;
            case "星期四": return 4;
            case "星期五": return 5;
            case "星期六": return 6;
            case "星期日": return 0;
        }
    }

    getnum(time){
        let Data=this.props.day;
        var count = 0;
        let arr = [];
        for(let i in Data){
            arr.push(Data[i]);
        }
        for(let i=0;i<arr.length;i++){
            count++;
            //console.log("arr[i]:"+arr[i]);
            //console.log("time:"+this.tran(time));
            if(arr[i] === this.tran(time)){
                break;
            }
        }
        //console.log("count:"+this.tran(time));
        return count;
    }

    render(){
        //console.log(this.props.day);
        //console.log(this.props.depart);
        //console.log(this.props.data);
        let Data=this.props.data;
        //console.log(Data.data_info);
        let type = [];
        for(let i in Data){
            //if(i !== "data_info"){
                type.push(i);
            //}
        }
        //console.log(type);
        return (
            <>
                {
                    type.map(Item=>{
                        //console.log(Item);
                        return (
                            <>
                                <p className='week'>{Item}</p>
                                {<Schedule depart={this.props.depart} data={Data[Item]}></Schedule>}
                            </>
                        )
                    })
                }
            </>
        )
    }
}

export default Result;