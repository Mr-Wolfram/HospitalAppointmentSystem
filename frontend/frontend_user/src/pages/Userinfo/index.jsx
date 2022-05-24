import React, {Component, useState, useEffect} from 'react';
import { Descriptions, Badge, Layout, Form } from 'antd';
import { Button, Menu, Modal,Input } from 'antd';
import "./index.css"
import { Avatar } from 'antd';
import axios from "axios";
import userinfo_api from "./../../commons/components/userinfo"
import { ConsoleSqlOutlined, UserOutlined } from '@ant-design/icons';
const { Header, Content, Sider } = Layout;

// function Changephone(){
//         userinfo_api.get_userinfo("1").then(r=>
//             console.log("order query",r.data)
//         )
// }



function Userinfo(){
    
    const[phoneStyle, setphoneStyle] = useState('');
    const[phonehelp, setphonehelp] = useState('')
    const handlephonenum = e => {
        const username = e.target.value
        const reg = /[0-9A-Za-z]{6,12}$/
        //判断格式
        if (username.length < 6 || !reg.test(username)) {
            setphoneStyle('warning');
            setphonehelp('用户名应为6-12个英文字符或数字');
            console.log(phoneStyle,phonehelp);
            return
        }
    }

    const[cnt,setcnt] = useState(0);
    const[phonenum,setphonenum] = useState(0);
    const[IDnum,setIDnum] = useState(0);
    const[username,setusername] = useState(0);
    const[age,setage] = useState(0);
    const[email,setemail] = useState(0);
    const[modalcontent,setmodalcontent] = useState(
        <div><Form.Item
            name="username"
            rules={[
                {
                    required: true,
                    message: '请输入您的用户名',
                    trigger: 'blur'
                },
                {
                    min: 6,
                    max: 12,
                    message: '用户名长度应为6-12个字符',
                    trigger: 'blur'
                }
            ]}
            validateStatus={phoneStyle}
            hasFeedback
            help={phonehelp}
            ><Input placeholder="请输入新的手机号" onChange={handlephonenum}/>
        </Form.Item>
    </div>
    );
    


    const [isModalVisible_phone, setIsModalVisible_phone] = useState(false);
    const [modalstate, setmodalstate] = useState(0);

    const phone_rebind = () => {
        setIsModalVisible_phone(true);
    };

    const handleOk = () => {
        if(modalstate == 0){ 
            setmodalcontent(<div><Input style={{ width: 200, textAlign: 'center' }} placeholder="请输入验证码" /></div>);
            setmodalstate(1);
        }
        else if(modalstate == 1){
            setmodalstate(0);
            setIsModalVisible_phone(false);
        }
    };

    const handleCancel = () => {
        setIsModalVisible_phone(false);
    };
    

    function Setinfo(pn,idnum,uname,ag,em){
        setphonenum(pn);
        setIDnum(idnum);
        setusername(uname);
        setage(ag);
        setemail(em);
    }

    function changestate1(){
        setcnt(0);
    }

    function changestate2(){
        setcnt(1);
    }

    function Getcontent(){

        useEffect(()=>{
            userinfo_api.get_userinfo("1").then(
                r=>{
                    Setinfo(r.data.data[0].phonenumber, r.data.data[0].IDnum,
                        r.data.data[0].username, r.data.data[0].age, r.data.data[0].email);
                }
            )
        })

        if(cnt == 1) return (
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
        )
        else return (
            <div class = "repodiv">
                <Descriptions  bordered column={1} labelStyle={{width:180,height:80}}>
                    <Descriptions.Item label="头像"><Avatar size={64} icon={<UserOutlined />} /></Descriptions.Item>
                    <Descriptions.Item label="用户名">{username}</Descriptions.Item>
                    <Descriptions.Item label="身份证号">{IDnum}</Descriptions.Item>
                    <Descriptions.Item label={<div class="labeldiv"><text>手机号</text><Button onClick={phone_rebind}>换绑</Button></div>}>{phonenum}</Descriptions.Item>
                    <Descriptions.Item label={<div class="labeldiv"><text>邮箱</text><Button>换绑</Button></div>}>{email}</Descriptions.Item>
                    <Descriptions.Item label="年龄">{age}</Descriptions.Item>
                    <Descriptions.Item label="收藏医生">
                        
                    </Descriptions.Item>
                </Descriptions>
                <Modal title="手机换绑" visible={isModalVisible_phone} onOk={handleOk} onCancel={handleCancel} okText="验证" cancelText="取消" >
                    {modalcontent}
                </Modal>
            </div>
        );
    }

    return (
        <div>
            <Menu mode="horizontal" >
                <Menu.Item key="1" onClick={changestate1}>
                用户基本信息
                </Menu.Item>
                <Menu.Item key="2" onClick={changestate2}>
                健康报告
                </Menu.Item>
            </Menu>

            <div class="content">
                <div>{Getcontent()}</div>
            </div>
        </div>
        
    );
}

export default Userinfo;