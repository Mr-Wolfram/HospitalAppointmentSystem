import React, {Component} from 'react';
import axios from "axios";
import { Form, Input, Button, Checkbox, message} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import cookie from 'react-cookies'
import './index.css'
import {Link} from "react-router-dom";
import loginPicture from "./../../images/loginPicture.jpg"
import ReactSimpleVerify from 'react-simple-verify'
import 'react-simple-verify/dist/react-simple-verify.css'
import login_api from "./../../commons/components/login"


class Login extends Component {

    //防止修改url访问
    componentWillMount () {
        const username = cookie.load('username');
        const phone = cookie.load('phone');
        const change = cookie.load('changeSuccess');
        if (username !== undefined) window.location.href = '/index';
        if(change !== undefined){
            message.success("密码修改成功，请重新登录", 2);
            cookie.remove('changeSuccess', {path:'/'})
        }
    }

    componentDidMount () {
        if (cookie.load('registerSuccess') !== undefined) {
            message.success('注册成功，请登陆', 2)
            cookie.remove('registerSuccess', {path:'/'})
        }
    }

    state = {
        username: '',
        password: '',
        phone:'',
        login:"username",
        slideconfirm:false,
        // render_login:this.login_by_username
    }

    //保存用户输入的用户名
    handleUsername = e => {
        this.setState({username: e.target.value})
    }

    handlePhone= e => {
        this.setState({phone: e.target.value})
    }

    //保存用户输入的密码
    handlePassword = e => {
        this.setState({password: e.target.value})
    }

    slidesuccess = () => {
        this.setState({slideconfirm: true})
    }

    //处理表单请求
    handleSubmit = () => {
        let that = this
        let uname = this.state.username
        let pwd = this.state.password

        if (that.state.username === '' && that.state.password === '') return
        if (this.state.slideconfirm == false) {
            message.warning('请进行滑块验证');
            return;
        }
        // axios.post('/api/user/check/name', {
        //     username: this.state.username
        // })
        login_api.checkname(this.state.name)
            .then(function (response) {
                const data = response.data
                const result = data.status
                if (result != 'success'){
                    message.warning('用户不存在', 2);
                    console.log("用户不存在")
                }
                else{
                    // axios.post('/api/user/login/pwd', {
                    //     username: uname,
                    //     password: pwd
                    // })
                    login_api.checkpwd(uname,pwd)
                        .then(function (response) {
                            const data = response.data
                            const result = data.status
                            console.log("data=",data);
                            if (result === 'success'){
                                cookie.save('username', that.state.username, { path: '/' });
                                cookie.save('loginSuccess', true, { path: '/' });
                                cookie.save('user_id',data.data.user_id)
                                cookie.save('token',data.data.token,{path:'/'})
                                // cookie.save('email', data.email, {path:'/'});
                                window.location.href = '/index';
                            }
                            else{
                                message.warning('账号或密码错误', 2)
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }
            })
            .catch(function (error) {
                console.log(error);
            });



    }

    //跳转注册界面
    goRegister = () => {
        window.location.href = '/register'
    }




    render () {
        return (
            <div className={"background"} >
                <div className='myForm'>
                    <img src={'./images/loginPicture.jpg'} alt={'loginPicture'} className='leftPicture'/>

                    <div className='right'>
                        <h6 className='title'>用户登录</h6>
                        {/*<div onClick={this.login_method}>切换登录方式</div>*/}
                        <hr className='line'/>
                        <Form
                            name="normal_login"
                            className="trueForm"
                            initialValues={{
                                remember: true,
                            }}
                        >
                            <Form.Item
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入您的用户名',
                                        trigger: 'blur'
                                    },
                                    {
                                        min: 6,
                                        max: 18,
                                        message: '用户名长度应为6-18个字符',
                                        trigger: 'blur'
                                    }
                                ]}
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" onChange={this.handleUsername}/>
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入您的密码！',
                                    },
                                ]}
                            >
                                <Input.Password
                                    prefix={<LockOutlined className="site-form-item-icon"/>}
                                    type="password"
                                    placeholder="密码"
                                    onChange={this.handlePassword}
                                />
                            </Form.Item>
                            <Form.Item >
                                <Form.Item name="remember" noStyle>
                                    <Checkbox>记住我</Checkbox>
                                </Form.Item>
                                <Link className="login-form-forgot" to="/forgetPwd" id="forgetPassword">
                                    忘记密码？
                                </Link>
                                <Link className="login-form-forgot" to="/login_phone" id="login_phone">
                                    手机登录
                                </Link>
                            </Form.Item>
                            <ReactSimpleVerify ref="verify" success={this.slidesuccess} />
                            <div className='space'></div>
                            <Form.Item id='buttons' >
                                <div className='myBtn'>
                                    <Button type="primary" htmlType="submit" className="login-form-button"
                                            onClick = {this.handleSubmit}>
                                        登录
                                    </Button>
                                    <Button type="primary" className="login-form-button" onClick = {this.goRegister}>
                                        注册
                                    </Button>
                                </div>
                            </Form.Item>
                        </Form>

                    </div>
                </div>
            </div>

        );
    }
}

export default Login;
