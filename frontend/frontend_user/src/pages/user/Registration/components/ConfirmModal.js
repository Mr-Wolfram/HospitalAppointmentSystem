import { Modal, Button, Space, Radio, message } from 'antd'
import React, { useState, useEffect } from 'react'
import api from "./../../../../commons/index"
import cookie from 'react-cookies'
import moment from 'moment'
import PayModal from './PayModal'
import img2 from '../images/2.png'

function ConfirmModal(props) {

  const [myState, setMyState] = useState(0);
  const [payVisible, setPayVisible] = useState(false);
  const [QRcodeUrl, setQRcodeUrl] = useState(undefined);
  const [orderId, setOrderId] = useState("");
  useEffect(() => {
    setMyState(myState + 1)
  }, [props])

  function handleConfirmModalOK() {
    api.post_registration_form(cookie.load("user_id"), props.doctorId, props.time)
    .then(r => {
      console.log("post registration form");
      if(r.data.submit === "submit_success") {
        // setQRcodeUrl(r.data.data.QRcodeUrl)
        setQRcodeUrl(img2)
        setOrderId(r.data.order_id)
        setPayVisible(true)
      }
      else {
        message.error("当前预约人数已满！")
      }
    })
  }

  function handleConfirmModalCancel() {
    props.changeConfirmInvisible(false)
  }

  return (
    <div>
      <Modal
        width={500}
        title='挂号订单确认'
        visible={props.visible}
        onOk={handleConfirmModalOK}
        // confirmLoading={this.state.confirmLoading}
        onCancel={handleConfirmModalCancel}
        okText='提交预约'
        cancelText='取消'
      >
        <span style={{ marginLeft: '50px', marginBottom: '52px', lineHeight: '50px' }}>
          用户姓名: {cookie.load("username")}<br/>
          医生姓名: {props.doctorMap.get(props.doctorId) ? props.doctorMap.get(props.doctorId).name : ""}<br/>
          医生科室: {props.doctorMap.get(props.doctorId) ? props.doctorMap.get(props.doctorId).department : ""}<br/>
          主治症状: {props.doctorMap.get(props.doctorId) ? props.doctorMap.get(props.doctorId).major : ""}<br/>
          预约日期: {moment().format('YYYY-MM-DD')}<br/>
          预约时间: {props.timeInterval[props.time]}<br/>
        </span>
      </Modal>

      <PayModal
        visible={payVisible}
        doctorId={props.doctorId}
        doctorMap={props.doctorMap}
        QRcodeUrl={QRcodeUrl}
        orderId={orderId}
        time={props.time}
        timeInterval={props.timeInterval}
        changePayInvisible={() => {
          setPayVisible(false)
        }}
        closeAllModals={() => {
          props.changeConfirmInvisible(false)
          props.closeAllModals()
        }}
      />
    </div>
  )

}

export default ConfirmModal;
