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

import { TreeSelect, Modal, Button, Space, Radio, message } from 'antd';
import React, { useState, useEffect } from 'react';
import api from "./../../../../commons/index"

function ConfirmModal (props){

    const [myState,setMyState]=useState(0)
    const [numberOfQueue,setNumberOfQueue]=useState([3, 0, 1, 0, 6, 2, 0, 2])
    useEffect(()=>{
        setMyState(myState+1)
        api.post_doctor_select(props.doctorId)
            .then(r => {
                console.log("post doctor select update",r);
                setNumberOfQueue(r.data.data.numberOfQueue);
            })
    },[props])


    function handleSearchModalCancel() {
        props.changeTimeTableInvisible(false);
    }

    return (

      <Modal
        title='预约挂号'
        visible={props.visiable}
        onOk={()=>{
            props.changeConfirmVis(false)
        }
        }
        // confirmLoading={this.state.confirmLoading}
        onCancel={()=>{
            props.changeConfirmVis(false)
        }}
        okText='确定'
        cancelText='取消'
      >


      </Modal>
)

}

export default ConfirmModal;
