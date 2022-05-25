import { Modal, Button, Space, Radio, message } from 'antd'
import React, { useState, useEffect } from 'react'
import api from "./../../../../commons/index"
import cookie from 'react-cookies'
import moment from 'moment'

function PayModal(props) {

  const [myState, setMyState] = useState(0);
  useEffect(() => {
    setMyState(myState + 1)
  }, [props])

  function handlePayModalOK() {
    api.post_registration_pay(props.orderId)
    .then(r => {
      if(r.data.data.paySuccess === true) {
        message.success('支付成功！')
      }
      else {
        message.error('支付失败!')
      }
      props.changePayInvisible(false)
      props.closeAllModals()
    })
  }

  function handlePayModalCancel() {
    props.changePayInvisible(false)
    props.closeAllModals(true)
  }

  return (
    <div>
      <Modal
        title='挂号费支付'
        visible={props.visible}
        onOk={handlePayModalOK}
        onCancel={handlePayModalCancel}
        okText='确定'
        cancelText='取消'>
        <p>预约医生: {props.doctorMap.get(props.doctorId) ? props.doctorMap.get(props.doctorId).name : ""}</p>
        <p>预约时间: {props.time}:00-{Number(props.time) + 1}:00</p>
        <img src={props.QRcodeUrl} alt='QRcode' style={{ marginLeft: '35px' }}></img>
      </Modal>
    </div>
  )

}

export default PayModal;
