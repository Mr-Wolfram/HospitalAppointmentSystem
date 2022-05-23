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

const doctorData = [
  {departmentId: '06', doctorId: '0041', name: '吴朝晖', department: '骨科' , major: '跌打损伤', info: '从医20余年, 经验丰富'},
  {departmentId: '06', doctorId: '0001', name: '竺可桢', department: '骨科' , major: '骨质疏松', info: '从医30余年, 主任医师'},
  {departmentId: '06', doctorId: '0022', name: '林建华', department: '骨科' , major: '各类骨折', info: '浙江大学校医院院长'},
  {departmentId: '04', doctorId: '0042', name: '张华', department: '耳鼻喉科' , major: '中耳炎', info: '北京大学医学院博士毕业'},
  {departmentId: '04', doctorId: '0211', name: '赵云', department: '耳鼻喉科' , major: '过敏性鼻炎', info: '从医30余年, 拥有丰富鼻炎治疗经验'},
  {departmentId: '01', doctorId: '0448', name: '李明', department: '眼科' , major: '青光眼', info: '浙江医科大学博士毕业'},
  {departmentId: '01', doctorId: '0129', name: '王刚', department: '眼科' , major: '白内障', info: '浙江大学校医院副院长'},
]

const treeData = [
  {
    title: '骨科',
    value: '06',
    children: [
      {
        title: '吴朝晖',
        value: '0041',
      },
      {
        title: '竺可桢',
        value: '0001',
      },
      {
        title: '林建华',
        value: '0022',
      },
    ],
  },
  {
    title: '耳鼻喉科',
    value: '04',
    children: [
      {
        title: '张华',
        value: '0042',
      },
      {
        title: '赵云',
        value: '0211',
      },
    ],
  },
  {
    title: '眼科',
    value: '01',
    children: [
      {
        title: '李明',
        value: '0448',
      },
      {
        title: '王刚',
        value: '0129',
      },
    ],
  },
];

class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      doctorId: '0041',
      timeTableVisible: false,
      confirmLoading: false,
      modalText: '??',
      time: undefined,
      payVisible: false,
      doctorData: [],
      treeData: [],
      doctorMap: new Map(),
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
            treeData: r.data.data.treeData
          }
          )
      //反正是一样的值,直接用刚才穿过来的值,因为还没更新state呢,就还是用r.data.data.doctorData
      let i;
      let newMap=new Map();
      for(i = 0; i < r.data.data.doctorData.length; i++) {
        //还是要用setState,可以new一个map,再覆盖
        newMap.set(
            r.data.data.doctorData.doctorId,
            {name: r.data.data.doctorData[i].name,
              department: r.data.data.doctorData[i].department,
              major: r.data.data.doctorData[i].major,
              info: r.data.data.doctorData[i].info
            })
      }
      //循环完之后一下子赋值改state的map
      this.setState({doctorMap:newMap});
      console.log(r.data.data.doctorData);
    });
    console.log(this.state.doctorData, this.state.treeData);

  };

  searchOnChange = value => {
    // console.log(value)
    this.setState({ doctorId: value });
  };

  showSearchModal = () => {
    api.post_doctor_select(this.state.doctorId)
    .then(r=>console.log("post doctor select", r.data.data.doctor_name, r.data.data.department))
    this.setState({ timeTableVisible: true });
  };

  handleSearchModalOk = () => {
    if(this.state.time === undefined) {
      message.error('未选择时间！')
    }
    else {
      this.setState({ modalText: 'The modal will be closed after two seconds' });
      this.setState({ confirmLoading: true });
      setTimeout(() => {
        this.showPayModal()
        // this.setState({ timeTableVisible: false });
        this.setState({ confirmLoading: false });
      }, 1500);
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
    this.setState({ payVisible: false, timeTableVisible: false });
    message.success('支付成功！');
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
          <span>姓名: {this.state.doctorMap.get(this.state.doctorId)?this.state.doctorMap.get(this.state.doctorId).name:""}<br/>
            科室: {this.state.doctorMap.get(this.state.doctorId)?this.state.doctorMap.get(this.state.doctorId).department:""}<br/>
            主治症状: {this.state.doctorMap.get(this.state.doctorId)?this.state.doctorMap.get(this.state.doctorId).major:""}<br/>
            个人简介: {this.state.doctorMap.get(this.state.doctorId)?this.state.doctorMap.get(this.state.doctorId).info:""}</span>
          <Radio.Group defaultValue='0' buttonStyle='solid' onChange={this.selectOnChange} style={{marginLeft: '30px', marginTop: '10px'}}>
            <Space size={[20, 20]} wrap>
              <Radio.Button value='8' style={{width: '120px', height: '60px'}}><span>8:00-9:00<br/>当前空余6人</span></Radio.Button>
              <Radio.Button value='9' style={{width: '120px', height: '60px'}}><span>9:00-10:00<br/>当前空余1人</span></Radio.Button>
              <Radio.Button value='10' style={{width: '120px', height: '60px'}}><span>10:00-11:00<br/>当前空余2人</span></Radio.Button>
              <Radio.Button value='11' style={{width: '120px', height: '60px'}} disabled><span>11:00-12:00<br/>当前空余0人</span></Radio.Button>
              <Radio.Button value='14' style={{width: '120px', height: '60px'}}><span>14:00-15:00<br/>当前空余5人</span></Radio.Button>
              <Radio.Button value='15' style={{width: '120px', height: '60px'}}><span>15:00-16:00<br/>当前空余3人</span></Radio.Button>
              <Radio.Button value='16' style={{width: '120px', height: '60px'}} disabled><span>16:00-17:00<br/>当前空余0人</span></Radio.Button>
              <Radio.Button value='17' style={{width: '120px', height: '60px'}}><span>17:00-18:00<br/>当前空余2人</span></Radio.Button>
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
          <img src={img2} alt='img2' style={{marginLeft: '35px'}}></img>
        </Modal>

      </>
    );
  }
}

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<Registration />);

export default Registration;
