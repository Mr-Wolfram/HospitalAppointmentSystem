import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { TreeSelect, Modal, Button, Space, Radio, message, Spin } from 'antd';
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/lib/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import 'antd/dist/antd.css';
import './index.css';
import img1 from './images/1.png'
import img2 from './images/2.png'
import api from "./../../../commons/index"
import cookie from 'react-cookies'
import SelectModal from './components/SelectModal'


moment.locale('zh-cn');

class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: undefined,
      doctorId: undefined,
      timeTableVisible: false,
      doctorData: [],
      treeData: [],
      doctorMap: new Map(),
    };
  }

  componentWillMount() {
    // cookie.save('user_id', 'u1234')
    // cookie.save('username', 'lyczju')
    this.setState({userId: cookie.load('user_id')})
    // let date = moment().format('d')
    // let date = new Date('2022-06-06T03:35:43.860Z')
    let date = new Date()
    api.get_doctor_info(date)
    .then(r => {
      console.log("get doctor info");
      console.log(r.data.data.doctorData, r.data.data.treeData)
      this.setState(
        {
          doctorData: r.data.data.doctorData,
          treeData: r.data.data.treeData,
          doctorId: r.data.data.doctorData.length != 0 ? r.data.data.doctorData[0].doctorId : "            ",
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

  showSearchModal = () => {
    if(this.state.doctorId === "            " || !this.state.doctorMap.has(this.state.doctorId)) {
      message.error("请选择医生！");
    }
    else {
      this.setState({ timeTableVisible: true });
    }
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
              style={{ width: '1000px' }}
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
              {this.state.doctorData.length === 0 ?
              <Spin size='large' style={{marginLeft: '500px', marginTop: '200px'}} /> :
              this.state.doctorData.map((item, index) => {
                return (
                  <Radio.Button value={item.doctorId} style={{width: '300px', height: '300px'}}><span><img src={img1} alt='img1' style={{width: '100px', height: '100px', marginLeft: '90px', marginTop: '10px'}} /><br/>姓名: {item.name}<br/>科室: {item.department}<br/>主治症状: {item.major}<br/>个人简介: {item.info.length > 51 ? item.info.slice(0, 51) : item.info}</span></Radio.Button>
                )
              })}
            </Space>
          </Radio.Group>
        </Space>

        <SelectModal
          timeTableVisible={this.state.timeTableVisible}
          doctorId={this.state.doctorId}
          doctorMap={this.state.doctorMap}
          doctorData={this.state.doctorData}
          changeTimeTableInvisible={() => {
            this.setState({timeTableVisible: false});
          }}
        />

      </>
    );
  }
}

export default Registration;
