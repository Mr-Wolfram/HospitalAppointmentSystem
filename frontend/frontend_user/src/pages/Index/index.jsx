import React, {Component} from 'react';
import {Typography, Breadcrumb, Button, Layout, Menu, message} from 'antd'


import Footer from "../../components/Footer";
import LeftMenu from "../../components/LeftMenu";
import AlterPwd from "../AlterPwd";
import Userinfo from "../Userinfo"
import './index.css'
import cookie from "react-cookies";
import {Route, Switch} from "react-router-dom";
import axios from "axios";
import logo from "../../images/logo.png"

import Department from "./../user/Department"
import TimeTable from "./../user/TimeTable"

import OrderManage from "./../user/OrderManage"
import Notice from "./../user/Notice"
import Registration from "./../user/Registration"
import IndexPage from "./../user/IndexPage"

const { Header, Content } = Layout;
const { Title } = Typography;
const items1 = ['1', '2', '3'].map((key) => ({
    key,
    label: `shortcut ${key}`,
  }));
export default class Index extends Component {

    state = {currentPage:"", username:cookie.load('username'), ws:null}

    constructor (props) {
        super (props);
        const username = cookie.load('username');
        // if(username === undefined) {
        //     window.location.href = '/login'
        // }

    }
    handleLoginOut = () => {
        cookie.remove('username', { path: '/' })
        cookie.remove('loginSuccess', { path: '/' })
        cookie.remove('webSocket', {path:'/'})
        cookie.remove('email', {path:'/'})
        const ws = this.state.ws;
        if(ws !== null) ws.close();
        window.location.href = '/login'
    }
    changePage = name => {
        this.setState({currentPage:name});
    }

    getMytask = () => {
        // axios.post("/getPersonalInfo", {
        //     username:this.state.username
        // }).then(response => {
        //     const data =  response.data;
        //     if(data.code === "success"){
        //         let array = data.taskArray.map((item, index) => {
        //             return {
        //                 taskName: item.taskName,
        //                 taskID: item.taskID
        //             }
        //         });

        //         cookie.save('taskArray', array, {path:'/'});
        //     }
        //     else{
        //         message.warning ("获取个人信息出错3").then (r  => console.log(r));
        //     }
        // })
    }

    componentDidMount () {
        this.getMytask();
        const webSocket = cookie.load('webSocket');
        if(webSocket === undefined){
            const ws = new WebSocket ('ws://localhost:4000');
            ws.onopen = function(e){
                console.log("连接服务器成功");
                ws.send('hello');
                // 向服务器发送消息
                ws.send("test");
            }
            ws.onclose = (e) => {
                this.setState({ws:null});
                cookie.remove('webSocket');
                console.log('websocket连接关闭')
            }
            ws.onmessage = function(e) {
                console.log(e.data);
                const array =JSON.parse( cookie.load('taskArray'));
                if(e.data.indexOf("onload") !== -1){
                    array.forEach(item => {
                        if(e.data.indexOf(item.taskID) !== -1){
                            const str = e.data.replace(item.taskID, "");
                            message.success( str, 10)
                                .then(value => console.log(value), reason => console.log(reason))
                        }
                    })
                }
                else{
                    array.forEach(item => {
                        if(e.data.indexOf(item.taskID) !== -1){
                            const str = e.data.replace(item.taskID, "");
                            message.warning( str, 10)
                                .then(value => console.log(value), reason => console.log(reason))
                        }
                    })
                }
            }
            this.setState({ws:ws});
            cookie.save('webSocket', true, {path:'/'});
        }

    }

    render () {
        return (
            <div>
            <Layout>
                {/* <Header className="header">
                    <Menu theme="dark" mode="horizontal" id="banner">
                        <div id="myTitle">
                            <Title style={{color:"white"}} level={3}>
                                医疗</Title>
                        </div>
                        <Button type="primary" id="exitBtn" onClick = {this.handleLoginOut}>退出登录</Button>
                    </Menu>
                </Header> */}
                <Header className="header">

                    <div className="logo" >

                        <div style={{position:"absolute",width:130,top:0,left:40,height:10,fontSize:17}}>
                            <img src={logo} alt={logo} width={18} />医疗诊断系统</div>
                    </div>
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items1} />
                    <Button type="primary" id="exitBtn" onClick = {this.handleLoginOut}>退出登录</Button>
                </Header>
                <Layout>
                    <LeftMenu changePag={this.changePage}/>
                    <Layout style={{ padding: '0 24px 24px', position:'relative' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item></Breadcrumb.Item>
                            <Breadcrumb.Item>{this.state.currentPage}</Breadcrumb.Item>
                        </Breadcrumb>
                        <Content
                            className="site-layout-background"
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: "90vh"
                                ,backgroundColor:'#F0F7F7'
                            }}
                        >
                            <Switch>
                                <Route exact path={"/index"} component={IndexPage}/>
                                <Route exact path={"/index/userinfo"} component={Userinfo}/>
                                <Route exact path={"/index/alterPwd"} component={AlterPwd}/>
                                <Route exact path={"/index/department"} component={Department}/>
                                <Route exact path={"/index/timetable"} component={TimeTable}/>
                                <Route exact path={"/index/ordermanage"} component={OrderManage}/>
                                <Route exact path={"/index/notice"} component={Notice}/>
                                <Route exact path={"/index/registration"} component={Registration}/>
                            </Switch>
                            {/*<Footer/>*/}
                        </Content>
                    </Layout>
                </Layout>
            </Layout>

            </div>
        );
    }
}
