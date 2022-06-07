import React, {Component, useState} from 'react';
import {Typography, Breadcrumb, Button, Layout, Menu, message, Avatar, Dropdown, Space, AutoComplete} from 'antd'

import Footer from "../../components/Footer";
import LeftMenu from "../../components/LeftMenu";
import AlterPwd from "../AlterPwd";
import Userinfo from "../Userinfo"
import './index.css'
import cookie from "react-cookies";
import {Route, Switch} from "react-router-dom";
import axios from "axios";
import logo from "../../images/logo.png"
import tmp from "./../user/IndexPage/html/tmp"
import Department from "./../user/Department"
import TimeTable from "./../user/TimeTable"
import userinfo_api from "./../../commons/components/userinfo"
import OrderManage from "./../user/OrderManage"
import Notice from "./../user/Notice"
import Registration from "./../user/Registration"
import IndexPage from "./../user/IndexPage"
import Icon, {UserOutlined, BellOutlined} from "@ant-design/icons";
import src from 'react-map-gl';


// import {MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined} from "@ant-design/icons";


const { Header, Content } = Layout;
const { Title } = Typography;
const items1 = ['1', '2', '3'].map((key) => ({
    key,
    label: `shortcut ${key}`,
  }));
export default class Index extends Component {

    state = {currentPage:"", username:cookie.load('username'), ws:null,collapsed:false,avatarsrc:'',
    
    notice:[{title:"aa",content:"bb"},{title:"aa",content:"bb"}],
    callnotice:0}

    constructor (props) {
        super (props);
        const username = cookie.load('username');
        if(username === undefined) {
            window.location.href = '/login'
        }
        const user_id = cookie.load('user_id');
        let that = this
        userinfo_api.get_notice(user_id).then(
            function(response){
                that.setState({notice:response.data.data})
            }
        )
        console.log("notice:",that.state.notice)
        userinfo_api.get_avatar(user_id).then(
            function(response){
                that.setState({avatarsrc:response.data.data.url})
            }
        )
    }

    Notice = () => {
        const user_id = cookie.load('user_id');
        return (
            <div className='notice'>
            {
                this.state.notice.map((Item,index)=>{
                    return (<div className='EachNotice'>
                        <h6>{Item.title}</h6>
                        <p>{Item.content}</p>
                        <p>{Item.announcer}{" "}{Item.date}</p>
                    </div>
                    )
                })
            }
            </div>
        )
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

    componentDidMount () {
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
                    {/*<div className="left-content">*/}
                    {/*    {React.createElement(this.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {*/}
                    {/*        className: 'trigger',*/}
                    {/*        onClick: ()=>this.setState({collapsed:!this.state.collapsed})*/}
                    {/*    })}*/}
                    {/*    /!*<Bread route={props} />*!/*/}
                    {/*</div>*/}
                    <div style={{position:'absolute',right:'10%',color:'white'}}>
                        <span style={{paddingRight: '10px'}}>
                          <Avatar size="large" icon={<UserOutlined /> } src={this.state.avatarsrc}/>
                            &nbsp;{cookie.load('username')}
                        </span>



                    </div>
                    <div className="logo" >

                        <div style={{position:"absolute",width:130,top:0,left:40,height:10,fontSize:17}}>
                            <img src={logo} alt={logo} width={18} />医疗诊断系统</div>
                    </div>
                    <div style={{position:"absolute",width:130,top:10,right:200,height:20,}} >
                    <Dropdown overlay={this.Notice} >
                        <a onClick={(e) => e.preventDefault()}>
                        <Space>
                            <BellOutlined style={{color:"white",fontSize:25}}/>
                        </Space>
                        </a>
                    </Dropdown>
                    </div>
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
