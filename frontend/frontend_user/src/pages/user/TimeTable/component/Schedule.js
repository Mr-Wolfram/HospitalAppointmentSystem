import '../index.css';
import React from 'react';
import { Descriptions } from 'antd';
import Time from './Time';


class Schedule extends React.Component{
    render(){
        let Data = this.props.data;
        let depart = [];
        for(let i in Data){
            depart.push(i);
        }
        //console.log(depart);
        return (
            <>
            {
                <Descriptions size='small' bordered={true} title={''} column={1}>
                    {
                        depart.map(Item=>{
                            return (
                            <Descriptions.Item label={Item}>
                                {
                                    <Time data={Data[Item]}></Time>
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