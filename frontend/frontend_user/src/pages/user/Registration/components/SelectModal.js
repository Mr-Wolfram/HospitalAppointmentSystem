import React, { useState, useEffect } from 'react'
import api from "./../../../../commons/index"
import { Modal, Space, Radio, message } from 'antd'
import ConfirmModal from "./ConfirmModal"
import moment from 'moment'

function SelectModal(props) {

  const [myState, setMyState] = useState(0);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [numberOfQueue, setNumberOfQueue] = useState([3, 0, 1, 0, 6, 2, 0, 2]);
  const [time, setTime] = useState(-1);
  const timeInterval = ["8:00 - 12:00", "12:00 - 18:00", "18:00 - 23:00"];
  useEffect(() => {
    setMyState(myState + 1)
    api.get_doctor_select(props.doctorId, moment().format('d'))
      .then(r => {
        console.log("get doctor select update", r)
        // let quotas = [0, 0, 0, 0, 0, 0, 0, 0]
        // let i = 0, morning = r.data.data.numberOfQueue[0], afternoon = r.data.data.numberOfQueue[1]
        // let morning_part = Math.floor(morning / 4), afternoon_part = Math.floor(afternoon / 4)
        // for(i = 0; i < 4; i++) {
        //   quotas[i] += morning_part
        //   morning -= morning_part
        // }
        // for(i = 4; i < 8; i++) {
        //   quotas[i] += afternoon_part
        //   afternoon -= afternoon_part
        // }
        // quotas[0] += morning
        // quotas[4] += afternoon
        
        setNumberOfQueue(r.data.data.numberOfQueue)
      })
  }, [props])
  //
  // function selectOnChange ( value) {
  //     console.log(value)
  //     this.setState({ time: value.target.value });
  // }

  // const handleSearchModalCancel = () => {
  //   props.changeTimeTableInvisible(false)
  // }
  function handleSearchModalCancel() {
    props.changeTimeTableInvisible(false)
  }

  function handleSearchModalOK() {
    // props.changeTimeTableInvisible(false)
    if(time === -1) {
      message.error('未选择时间！')
    }
    else {
      let curTime = Number(moment().format('HH:mm:ss').split(":")[0])
      if(time === 0 && curTime > 12 || time === 1 && curTime > 18 || time === 2 && curTime > 23) {
        message.error('超过当日预约时间！')
      }
      else {
        setConfirmVisible(true)
      }
    }
  }
  const tmpArray = ["姓名", "科室", "主治症状", "个人简介"];

  function generateIntroComponent(r) {
    let res;
    if (r === "姓名") {
      res = props.doctorMap.get(props.doctorId) ? props.doctorMap.get(props.doctorId).name : ""
    } else if (r === "科室") {
      res = props.doctorMap.get(props.doctorId) ? props.doctorMap.get(props.doctorId).department : ""
    } else if (r === "主治症状") {
      res = props.doctorMap.get(props.doctorId) ? props.doctorMap.get(props.doctorId).major : ""
    } else if (r === "个人简介") {
      let info = props.doctorMap.get(props.doctorId) ? props.doctorMap.get(props.doctorId).info : ""
      res = info.length > 170 ? info.slice(0, 170) : info
    }
    return r + ": " + res + "\n";
  }
  return (
    <div>
      <Modal
        width={500}
        title="挂号预约"
        visible={props.timeTableVisible}
        onOk={handleSearchModalOK}
        onCancel={handleSearchModalCancel}
        okText="确认"
        cancelText="取消"
      >
        <span style={{ marginLeft: '30px', lineHeight: '30px' }}>
          {tmpArray.map(r => generateIntroComponent(r))}
        </span>
        <Radio.Group defaultValue='0' buttonStyle='solid' onChange={(event) => {
          setTime(event.target.value)
        }
        } style={{ marginLeft: '30px', marginTop: '10px' }}>
          <Space size={[20, 20]} wrap>
            {numberOfQueue.map((item, index) => {
              if(item === 0) {
                return (
                  <Radio.Button value={index} style={{ width: '120px', height: '60px' }} disabled>
                    <span>{timeInterval[index]}<br />当前空余{item}人</span></Radio.Button>
                )
              }
              else {
                return (
                  <Radio.Button value={index} style={{ width: '120px', height: '60px' }}>
                    <span>{timeInterval[index]}<br />当前空余{item}人</span></Radio.Button>
                )
              }
              // let startTime = 0;
              // if (index < 4) {
              //   startTime = index + 8;
              // }
              // else {
              //   startTime = index + 10;
              // }
              // if (item === 0) {
              //   return (
              //     <Radio.Button value={startTime} style={{ width: '120px', height: '60px' }} disabled>
              //       <span>{startTime}:00-{startTime + 1}:00<br />当前空余{item}人</span></Radio.Button>
              //   )
              // }
              // else {
              //   return (
              //     <Radio.Button value={startTime} style={{ width: '120px', height: '60px' }}>
              //       <span>{startTime}:00-{startTime + 1}:00<br />当前空余{item}人</span></Radio.Button>
              //   )
              // }
            })}
          </Space>
        </Radio.Group>
      </Modal>

      <ConfirmModal
        visible={confirmVisible}
        doctorId={props.doctorId}
        doctorMap={props.doctorMap}
        time={time}
        timeInterval={timeInterval}
        changeConfirmInvisible={() => {
          setConfirmVisible(false)
        }}
        closeAllModals={() => {
          props.changeTimeTableInvisible(false)
        }}
      />
    </div>
  )
}

export default SelectModal;
