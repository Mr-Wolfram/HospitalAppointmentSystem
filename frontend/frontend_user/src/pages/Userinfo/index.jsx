import React, {Component} from 'react';
import { Descriptions, Badge, Layout } from 'antd';
import { Button, Menu, message } from 'antd';
import "./index.css"
import { Avatar } from 'antd';
import axios from "axios";
import { UserOutlined } from '@ant-design/icons';
const { Header, Content, Sider } = Layout;

function changephone(){
    message.warning("ss");
}

let basicinfo = (
    <div class = "repodiv">
        <Descriptions  bordered column={1} labelStyle={{width:180,height:80}}>
            <Descriptions.Item label="头像"><Avatar size={64} icon={<UserOutlined />} /></Descriptions.Item>
            <Descriptions.Item label="用户名">usrname</Descriptions.Item>
            <Descriptions.Item label="身份证号">111111</Descriptions.Item>
            <Descriptions.Item label={<div class="labeldiv"><text>手机号</text><Button onClick={changephone}>换绑</Button></div>}>123456</Descriptions.Item>
            <Descriptions.Item label={<div class="labeldiv"><text>邮箱</text><Button>换绑</Button></div>}>123@qq.com</Descriptions.Item>
            <Descriptions.Item label="年龄">18</Descriptions.Item>
            <Descriptions.Item label="收藏医生">
                
            </Descriptions.Item>
        </Descriptions>
    </div>
);

let healthrepo = (
    <div class = "repodiv">
        <Descriptions title="您的健康报告" bordered column={4}  labelStyle={{width:120}}>
            <Descriptions.Item label="血压">0</Descriptions.Item>
            <Descriptions.Item label="身高">0</Descriptions.Item>
            <Descriptions.Item label="体重">0</Descriptions.Item>
            <Descriptions.Item label="a指数">0</Descriptions.Item>
            <Descriptions.Item label="b指数">0</Descriptions.Item>
            <Descriptions.Item label="c指数">0</Descriptions.Item>
        </Descriptions>
        <br></br>
        <Descriptions title="健康提示" bordered>
            <Descriptions.Item>
                1.xx<br></br>
                2.xx<br></br>
                3.xx
            </Descriptions.Item>
        </Descriptions>
    </div>
);

class Userinfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
          content: basicinfo
        };
    }

    render () {
        return (
            <div>
                <Menu mode="horizontal" >
                    <Menu.Item key="1" onClick={()=> this.setState({numberCount: this.state.content=(basicinfo)})}>
                    用户基本信息
                    </Menu.Item>
                    <Menu.Item key="2" onClick={()=> this.setState({numberCount: this.state.content=(healthrepo)})}>
                    健康报告
                    </Menu.Item>
                </Menu>

                <div class="content">
                    <div>{this.state.content}</div>
                </div>
            </div>
            
        );
    }
}

export default Userinfo;