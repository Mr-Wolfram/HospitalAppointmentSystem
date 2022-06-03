import React, { useState, useEffect } from 'react'
import api from "./../../../../commons/index"
import { Modal, Space, Radio, message } from 'antd'
import ConfirmModal from "./ConfirmModal"
import moment from 'moment'

function SelectModal(props) {

  const [myState, setMyState] = useState(0);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [numberOfQueue, setNumberOfQueue] = useState([3, 0, 1, 0, 6, 2, 0, 2]);
  const [time, setTime] = useState(0);
  useEffect(() => {
    setMyState(myState + 1)
    api.get_doctor_select(props.doctorId)
      .then(r => {
        console.log("get doctor select update", r)
        // setNumberOfQueue(r.data.data.numberOfQueue)
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
    if(time === 0) {
      message.error('未选择时间！')
    }
    else {
      // let curTime = moment().format('HH:mm:ss')
      // if(Number(curTime.split(":")[0]) >= time) {
      //   message.error('超过当日预约时间！')
      // }
      // else {
        setConfirmVisible(true)
      // }
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
      res = props.doctorMap.get(props.doctorId) ? props.doctorMap.get(props.doctorId).info : ""
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

      <ConfirmModal
        visible={confirmVisible}
        doctorId={props.doctorId}
        doctorMap={props.doctorMap}
        time={time}
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
