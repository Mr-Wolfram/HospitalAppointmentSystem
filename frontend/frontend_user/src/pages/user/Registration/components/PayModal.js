import { Modal, Button, Space, Radio, message, Statistic, notification } from 'antd'
import React, { useState, useEffect } from 'react'
import api from "./../../../../commons/index"
import cookie from 'react-cookies'
import moment from 'moment'
import Countdown from 'antd/lib/statistic/Countdown'

function PayModal(props) {

  const [myState, setMyState] = useState(0);
  useEffect(() => {
    setMyState(myState + 1)
  }, [props])

  function handlePayModalOK() {
    api.get_registration_pay(props.orderId, props.doctorId, props.time)
    .then(r => {
      if(r.data.pay === "pay_success") {
        let desc = '预约医生: ' + String(props.doctorMap.get(props.doctorId) ? props.doctorMap.get(props.doctorId).name : "") + '\n' +
                          '预约时间: ' +  props.timeInterval[props.time] + '\n' +
                          '请及时就诊！'
        // message.success('支付成功！')
        notification['success']({
          message: '预约成功！',
          description:
            desc,
          style: {whiteSpace: 'pre-wrap'}
        });

      }
      else {
        message.error('支付失败!')
      }
      props.changePayInvisible(false)
      props.closeAllModals()
    })
  }

  function handlePayModalRevoke() {
    api.order_revoke(props.orderId, cookie.load("user_id"))
    .then(r => {
      console.log(r)
      if(r.data.status === 'success') {
        message.info('预约已取消！')
      }
    })
    props.changePayInvisible(false)
    props.closeAllModals(true)
  }

  function handlePayModalTimeout() {
    if(props.visible === true) {
      api.order_revoke(props.orderId, cookie.load("user_id"))
      .then(r => {
        if(r.data.status === 'success') {
          message.info('支付超时，预约已取消！')
        }
      })
      props.changePayInvisible(false)
      props.closeAllModals(true)
    }
  }

  return (
    <div>
      <Modal
        width={500}
        title='挂号费支付'
        visible={props.visible}
        onOk={handlePayModalOK}
        onCancel={handlePayModalRevoke}
        okText='确定支付'
        cancelText='撤销订单'
        destroyOnClose='true'
      >
        <p>预约医生: {props.doctorMap.get(props.doctorId) ? props.doctorMap.get(props.doctorId).name : ""}</p>
        <p>预约时间: {props.timeInterval[props.time]}</p>
        <Countdown
          style={{marginLeft: '170px'}}
          title='支付时间'
          value={Date.now() + 15 * 60 * 1000}
          onFinish={handlePayModalTimeout}
        />
        <img
          className='QRCode'
          src={props.QRcodeUrl}
          alt='QRcode'
          style={{marginLeft: '120px', height: '200px', width: '200px'}}
        ></img>
        <p style={{marginLeft: '180px', marginTop: '5px', marginBottom: '0px', fontSize: '150%'}}>￥5.00</p>
      </Modal>
    </div>
  )

}

export default PayModal;
