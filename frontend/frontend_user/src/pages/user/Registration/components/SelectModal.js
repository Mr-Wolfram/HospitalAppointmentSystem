//
// class MyModal {
//     state={value:1111}
//
//     render(){
//         return <div>
//             <div>
//                 {this.props.data}
//                 <Button onClick={()=>{
//                     this.props.changeFatherStatus(param)
//                 }
//                 } />
//             </div>
//             <Modal
//                 title='预约挂号'
//                 visible={this.state.timeTableVisible}
//                 onOk={this.handleSearchModalOk}
//                 confirmLoading={this.state.confirmLoading}
//                 onCancel={this.handleSearchModalCancel}
//                 okText='确定'
//                 cancelText='取消'
//             >
//                 }
//         </div>
// }
//
//
//
//
import React, { useState, useEffect } from 'react';
import api from "./../../../../commons/index"
import ConfirmModal from "./ConfirmModal";

import { TreeSelect, Modal, Button, Space, Radio, message } from 'antd';
function SelectModal (props) {

    const [myState, setMyState] = useState(0)
    const [confirmVisable, setConfirmVisable] = useState(false)
    const [numberOfQueue, setNumberOfQueue] = useState([3, 0, 1, 0, 6, 2, 0, 2])
    const [time,setTime]=useState(0);
    useEffect(() => {
        setMyState(myState + 1)
        api.post_doctor_select(props.doctorId)
            .then(r => {
                console.log("post doctor select update", r);
                setNumberOfQueue(r.data.data.numberOfQueue);
            })
    }, [props])
    //
    // function selectOnChange ( value) {
    //     console.log(value)
    //     this.setState({ time: value.target.value });
    // }
    const handleSearchModalCancel=()=> {
        props.changeTimeTableInvisible(false);
    }

    function handleSearchModalOK() {
        // props.changeTimeTableInvisible(false);
        setConfirmVisable(true);
    }
    const tmpArray=["姓名","科室","主治症状","个人简介"];
let tmpJson={
    "key":{
        "mj":[]

    }
}
// let ok=tmpJson.key["mj"];
// let  tmp=[{
//     "key":"value"
// },{ "key":"value"}]
//     let the=tmp.map(r=>{
//         r.key
//     })
    function generateIntroComponent(r){
        let res;
        if(r==="姓名"){
            res=props.doctorMap.get(props.doctorId)?props.doctorMap.get(props.doctorId).name:""
        }else if(r==="科室"){
            res=props.doctorMap.get(props.doctorId)?props.doctorMap.get(props.doctorId).department:""
        }else if(r==="主治症状"){
            res=props.doctorMap.get(props.doctorId)?props.doctorMap.get(props.doctorId).major:""
        }else if(r==="个人简介"){
            res=props.doctorMap.get(props.doctorId)?props.doctorMap.get(props.doctorId).info:""
        }
        return r + ": " + res + "\n";
    }
    return (
        <div>
            <Modal
                title="aaa"
                visible={props.timeTableVisible}
                onCancel={handleSearchModalCancel}
                onOk={handleSearchModalOK}
            > <div color={'black'}>{props.doctorId}</div>
                <span style={{ marginLeft: '30px' }}>
          {tmpArray.map(r =>generateIntroComponent(r))}
        </span>
                <Radio.Group defaultValue='0' buttonStyle='solid' onChange={(event)=>{
                    setTime(event.target.value)
                }
                } style={{ marginLeft: '30px', marginTop: '10px' }}>
                    <Space size={[20, 20]} wrap>
                        {numberOfQueue.map((item, index) => {
                            let startTime = 0;
                            if (index < 4) {
                                startTime = index + 8;
                            }
                            else {
                                startTime = index + 10;
                            }
                            if (item === 0) {
                                return (
                                    <Radio.Button value={startTime} style={{ width: '120px', height: '60px' }} disabled>
                                        <span>{startTime}:00-{startTime + 1}:00<br />当前空余{item}人</span></Radio.Button>
                                )
                            }
                            else {
                                return (
                                    <Radio.Button value={startTime} style={{ width: '120px', height: '60px' }}>
                                        <span>{startTime}:00-{startTime + 1}:00<br />当前空余{item}人</span></Radio.Button>
                                )
                            }
                        })}
                    </Space>
                </Radio.Group>
            </Modal>

            <ConfirmModal visiable={confirmVisable}
                          doctorId={props.doctorId}
                            changeConfirmVis={r=>setConfirmVisable(r)}
            />
        </div>


    )

}

export default SelectModal;
