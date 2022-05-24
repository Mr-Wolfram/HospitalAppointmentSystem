import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { TreeSelect, Modal, Button, Space, Radio, message } from 'antd';
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/lib/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import 'antd/dist/antd.css';
import './index.css';
import img1 from './images/1.png'
import img2 from './images/2.png'
import api from "./../../../commons/index"

moment.locale('zh-cn');

class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: 'u1144',
      doctorId: undefined,
      timeTableVisible: false,
      confirmLoading: false,
      modalText: '??',
      time: undefined,
      payVisible: false,
      doctorData: [],
      treeData: [],
      doctorMap: new Map(),
      numberOfQueue: [],
      QRcodeUrl: undefined,
      orderId: undefined,
    };
  }

  componentWillMount() {
    let date = new Date()
    api.post_doctor_info(date)
    .then(r => {
      console.log("post doctor info");
      this.setState(
        {
          doctorData: r.data.data.doctorData,
          treeData: r.data.data.treeData,
          doctorId: r.data.data.doctorData[0].doctorId,
        }
      )
      //反正是一样的值,直接用刚才穿过来的值,因为还没更新state呢,就还是用r.data.data.doctorData
      let i;
      let newMap=new Map();
      for(i = 0; i < r.data.data.doctorData.length; i++) {
        //还是要用setState,可以new一个map,再覆盖
        newMap.set(
            r.data.data.doctorData[i].doctorId,
            {name: r.data.data.doctorData[i].name,
              department: r.data.data.doctorData[i].department,
              major: r.data.data.doctorData[i].major,
              info: r.data.data.doctorData[i].info
            })
      }
      //循环完之后一下子赋值改state的map
      this.setState({doctorMap:newMap});
      // console.log(r.data.data.doctorData);
    });
    // console.log(this.state.doctorData, this.state.treeData);

  };

  searchOnChange = value => {
    // console.log(value)
    this.setState({ doctorId: value });
  };

  tmpArray=["姓名","科室","主治症状","个人简介"];
  generateIntroComponent(r){
    let res;
    if(r==="姓名"){
        res=this.state.doctorMap.get(this.state.doctorId)?this.state.doctorMap.get(this.state.doctorId).name:""
    }else if(r==="科室"){
        res=this.state.doctorMap.get(this.state.doctorId)?this.state.doctorMap.get(this.state.doctorId).department:""
    }else if(r==="主治症状"){
        res=this.state.doctorMap.get(this.state.doctorId)?this.state.doctorMap.get(this.state.doctorId).major:""
    }else if(r==="个人简介"){
        res=this.state.doctorMap.get(this.state.doctorId)?this.state.doctorMap.get(this.state.doctorId).info:""
    }
    return r + ": " + res + "\n";
  }

  showSearchModal = () => {
    api.post_doctor_select(this.state.doctorId)
    .then(r => {
      console.log("post doctor select");
      this.setState({numberOfQueue: r.data.data.numberOfQueue});
    })
    this.setState({ timeTableVisible: true });
  };

  handleSearchModalOk = () => {
    if(this.state.time === undefined) {
      message.error('未选择时间！');
    }
    else {
      this.setState({ modalText: 'The modal will be closed after two seconds' });
      this.setState({ confirmLoading: true });
      api.post_registration_form(this.state.userId, this.state.doctorId, this.state.time)
      .then(r => {
        console.log("post registration form");
        if(r.data.data.submitSuccess === true) {
          this.showPayModal();
          // this.setState({ timeTableVisible: false });
          this.setState({
            confirmLoading: false,
            QRcodeUrl: r.data.data.QRcodeUrl,
            orderId: r.data.data.orderId,
          });
        }
        else {
          message.error("当前排队人数已满！");
          this.handleSearchModalCancel();
          this.showSearchModal();
        }
      });
    }
    // console.log(this.state.time)
    // this.setState({ timeTableVisible: false });
  };

  handleSearchModalCancel = () => {
    this.setState({ timeTableVisible: false });
  };

  selectOnChange = value => {
    console.log(value)
    this.setState({ time: value.target.value });
  }

  showPayModal = () => {
    this.setState({ payVisible: true });
  };

  handlePayModalOk = () => {
    api.post_registration_pay(this.state.orderId)
    .then(r => {
      console.log("post registration pay");
      this.setState({ payVisible: false, timeTableVisible: false });
      if(r.data.data.paySuccess === true) {
        message.success('支付成功！');
      }
      else {
        message.error('支付失败!');
      }
    })
  };

  handlePayModalCancel = () => {
    this.setState({ payVisible: false, timeTableVisible: false });
    message.error('支付失败!');
  };

  chooseOnChange = value => {
    this.searchOnChange(value.target.value)
    this.showSearchModal()
  }

  render() {
    return (
      <>
        <Space direction='vertical' size='middle'>
          <div>
            <TreeSelect
              style={{ width: '80%' }}
              value={this.state.doctorId}
              dropdownStyle={{ maxHeight: 600, overflow: 'auto' }}
              treeData={this.state.treeData}
              placeholder='请选择预约医生'
              treeDefaultExpandAll
              onChange={this.searchOnChange}
            />
            <Button type='primary' onClick={this.showSearchModal} style={{marginLeft: '10px'}}>
              查询
            </Button>
          </div>
          <Radio.Group defaultValue='0' buttonStyle='outline' onChange={this.chooseOnChange}>
            <Space size={[20, 20]} wrap>
              {this.state.doctorData.map((item, index) => {
                return (
                  <Radio.Button value={item.doctorId} style={{width: '300px', height: '300px'}}><span><img src={img1} alt='img1' style={{width: '100px', height: '100px', marginLeft: '90px', marginTop: '10px'}} /><br/>姓名: {item.name}<br/>科室: {item.department}<br/>主治症状: {item.major}<br/>个人简介: {item.info}</span></Radio.Button>
                )
              })}
            </Space>
          </Radio.Group>
        </Space>
        <Modal
          title='预约挂号'
          visible={this.state.timeTableVisible}
          onOk={this.handleSearchModalOk}
          confirmLoading={this.state.confirmLoading}
          onCancel={this.handleSearchModalCancel}
          okText='确定'
          cancelText='取消'
        >
          <span style={{marginLeft: '30px'}}>
            {this.tmpArray.map(r=>this.generateIntroComponent(r))}
          </span>
          <Radio.Group defaultValue='0' buttonStyle='solid' onChange={this.selectOnChange} style={{marginLeft: '30px', marginTop: '10px'}}>
            <Space size={[20, 20]} wrap>
            {this.state.numberOfQueue.map((item, index) => {
              let startTime = 0;
                if(index < 4) {
                  startTime = index + 8;
                }
                else {
                  startTime = index + 10;
                }
                if(item === 0) {
                  return (
                    <Radio.Button value={startTime} style={{width: '120px', height: '60px'}} disabled><span>{startTime}:00-{startTime + 1}:00<br/>当前空余{item}人</span></Radio.Button>
                  )
                }
                else {
                  return (
                    <Radio.Button value={startTime} style={{width: '120px', height: '60px'}}><span>{startTime}:00-{startTime + 1}:00<br/>当前空余{item}人</span></Radio.Button>
                  )
                }
              })}
              {/* <Radio.Button value='8' style={{width: '120px', height: '60px'}}><span>8:00-9:00<br/>当前空余{this.state.numberOfQueue[0]}人</span></Radio.Button>
              <Radio.Button value='9' style={{width: '120px', height: '60px'}}><span>9:00-10:00<br/>当前空余{this.state.numberOfQueue[1]}人</span></Radio.Button>
              <Radio.Button value='10' style={{width: '120px', height: '60px'}}><span>10:00-11:00<br/>当前空余{this.state.numberOfQueue[2]}人</span></Radio.Button>
              <Radio.Button value='11' style={{width: '120px', height: '60px'}} disabled><span>11:00-12:00<br/>当前空余{this.state.numberOfQueue[3]}人</span></Radio.Button>
              <Radio.Button value='14' style={{width: '120px', height: '60px'}}><span>14:00-15:00<br/>当前空余{this.state.numberOfQueue[4]}人</span></Radio.Button>
              <Radio.Button value='15' style={{width: '120px', height: '60px'}}><span>15:00-16:00<br/>当前空余{this.state.numberOfQueue[5]}人</span></Radio.Button>
              <Radio.Button value='16' style={{width: '120px', height: '60px'}} disabled><span>16:00-17:00<br/>当前空余{this.state.numberOfQueue[6]}人</span></Radio.Button>
              <Radio.Button value='17' style={{width: '120px', height: '60px'}}><span>17:00-18:00<br/>当前空余{this.state.numberOfQueue[7]}人</span></Radio.Button> */}
            </Space>
          </Radio.Group>
        </Modal>
        <Modal
          title='挂号费支付'
          visible={this.state.payVisible}
          onOk={this.handlePayModalOk}
          onCancel={this.handlePayModalCancel}
          okText='确定'
          cancelText='取消'>
          <p>预约医生: {this.state.doctorMap.get(this.state.doctorId)?this.state.doctorMap.get(this.state.doctorId).name:""}</p>
          <p>预约时间: {this.state.time}:00-{Number(this.state.time) + 1}:00</p>
          <img src={this.state.QRcodeUrl} alt='QRcode' style={{marginLeft: '35px'}}></img>
        </Modal>

      </>
    );
  }
}

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<Registration />);

export default Registration;
