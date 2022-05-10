import React, {Component} from 'react';
import {useState} from 'react';
import { DatePicker, TimePicker, Select, Space } from 'antd';
import "./index.css"

import { Menu, Layout, Button } from 'antd';

import {
    PieChartOutlined,
    DesktopOutlined,
    ContainerOutlined,
  } from '@ant-design/icons';

const { Option } = Select;
const { Header, Content, Sider } = Layout;

const items1 = ['1', '2', '3'].map((key) => ({
    key,
    label: `nav ${key}`,
  }));

function PickerWithType({ type, onChange }) {
    return <DatePicker  picker={'date'} onChange={onChange} placeholder="请选择时间"/>;
}
  
function SwitchablePicker() {
    const [type, setType] = useState('date');
    return (
      <Space>
        <Select value={type} onChange={setType} >
          <Option value="date">日期</Option>
          <Option value="month">月份</Option>
          <Option value="year">年份</Option>
        </Select>
        <PickerWithType type={type} onChange={value => console.log(value)} />
      </Space>
    );
}


function Noticegenerate(key){
    if(key==1){
        return (
            <div>
                <div class = "Notice">系统通知1</div>
                <div class = "Notice">系统通知1</div>
                <div class = "Notice">系统通知1</div>
            </div>
            
        );
    }else if(key==2){
        return (
            <div>
                <div class = "Notice">系统通知2</div>
                <div class = "Notice">系统通知2</div>
                <div class = "Notice">系统通知2</div>
                <div class = "Notice">系统通知2</div>
                <div class = "Notice">系统通知2</div>
                <div class = "Notice">系统通知2</div>
            </div>
        )
    }else if(key==3){
        return (
            <div>
                <div class = "Notice">系统通知3</div>
                <div class = "Notice">系统通知3</div>
                <div class = "Notice">系统通知3</div>
                <div class = "Notice">系统通知3</div>
            </div>
        )
    }
    
}


class Notice extends Component {

    constructor(props) {
        super(props);
        this.state = {
          content: Noticegenerate(1)
        };
    }

    render () {
        return (
            <div >
                <div>
                    <SwitchablePicker/>
                    <div class="sys_messages">
                    <Layout width={150} >
                        <Sider width={150} >
                            <Menu mode="inline" 
                            style={{
                                height: '100%',
                                borderRight: 0
                            }}>
                                <Menu.Item key="1" onClick={()=> this.setState({changecontent: this.state.content=Noticegenerate(1)})}>缴费</Menu.Item>
                                <Menu.Item key="2" onClick={()=> this.setState({changecontent: this.state.content=Noticegenerate(2)})}>预约</Menu.Item>
                                <Menu.Item key="3" onClick={()=> this.setState({changecontent: this.state.content=Noticegenerate(3)})}>取药</Menu.Item>
                            </Menu>
                        </Sider>
                        <Content >
                            <div class="content">
                                {this.state.content}
                            </div>
                        </Content>

                    </Layout>
                    </div>
                </div>
            </div>
        );
    }
}

export default Notice;