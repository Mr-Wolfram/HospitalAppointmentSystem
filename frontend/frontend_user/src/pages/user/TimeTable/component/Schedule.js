import '../index.css';
import React from 'react';
import { Descriptions } from 'antd';
import Time from './Time';
import api from './../../../../commons/components/querydeparment'


class Schedule extends React.Component{
    render(){
        let Data = this.props.data;
        let depart = [];
        for(let i in Data){
            depart.push(i);
        }
        //console.log(this.props.depart);
        //console.log(this.props.data);
        return (
            <>
            {
                <Descriptions style={{ width: '82.5%'}} labelStyle={{'width':'10%','textAlign':'center'}} className='table1' size='small' bordered={true} title={''} column={1}>
                    {
                        depart.map(Item=>{
                            return (
                            <Descriptions.Item bordered={true} label={Item}>
                                {
                                    <Time depart={Item} data={Data[Item]}></Time>
                                }
                            </Descriptions.Item>
                            )
                        })
                    }
                </Descriptions>
            }
            </>
        )
    }
}

export default Schedule;