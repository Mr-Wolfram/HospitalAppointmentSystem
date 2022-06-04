import React, {Component} from 'react';
import axios from "axios";
import { Form, Input, Button, Checkbox, message} from 'antd';
import {UserOutlined, LockOutlined, PhoneOutlined, CodeOutlined} from '@ant-design/icons';
import cookie from 'react-cookies'
import './index.css'
import {Link} from "react-router-dom";
import loginPicture from "./../../images/loginPicture.jpg"
import login_api from "./../../commons/components/login"
import ReactSimpleVerify from 'react-simple-verify'
import 'react-simple-verify/dist/react-simple-verify.css'

class LoginPhone extends Component {

    //防止修改url访问
    componentWillMount () {
        const username = cookie.load('username');
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
        idcode:'',
        slideconfirm:false,
        login:"username",
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

    handleIDcode = e => {
        this.setState({idcode: e.target.value})
    }

    slidesuccess = () => {
        this.setState({slideconfirm: true})
    }

    //处理表单请求
    handleSubmit = () => {
        let that = this
        let pnum = this.state.phone
        let idc = this.state.idcode

        if (that.state.phone === '' && that.state.password === '') return
        if (this.state.slideconfirm == false) {
            message.warning('请进行滑块验证');
            return;
        }

        // axios.post('/api/user/check/phone', {
        //     phone: this.state.phone
        // })
        login_api.checkphone(this.state.phone)
            .then(function (response) {
                const data = response.data
                const result = data.data.isExist
                if (result == false){
                    message.warning('该手机号未绑定', 2);
                    console.log("该手机号未绑定")
                }
                else{
                    // axios.post('/api/user/login/idcode', {
                    //     phone: pnum,
                    //     idcode: idc
                    // })
                    login_api.checkidcode(pnum,idc)
                        .then(function (response) {
                            const data = response.data
                            const result = data.status
                            const username = data.data.username
                            console.log("data=",data);
                            if (result === 'success'){
                                cookie.save('phone', that.state.phone, { path: '/' });
                                cookie.save('username', username, { path: '/' });
                                cookie.save('loginSuccess', true, { path: '/' });
                                cookie.save('user_id',data.data.user_id)
                                cookie.save('token',data.data.token,{path:'/'})
                                // cookie.save('email', data.email, {path:'/'});
                                window.location.href = '/index';
                            }
                            else{
                                message.warning('验证码错误', 2)
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
            <div className={'background'}>
                <div className='myForm'>
                    <img src={'./images/loginPicture.jpg'} alt={'loginPicture'} className='leftPicture'/>

                    <div className='right'>
                        <h6 className='title'>用户登录</h6>
                        <hr className='line'/>
                        <Form
                            name="normal_login"
                            className="trueForm"
                            initialValues={{
                                remember: true,
                            }}
                        >
                            <Form.Item
                                name="phone"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入您的手机号',
                                        trigger: 'blur'
                                    },
                                    {
                                        pattern:/^1[3456789]\d{9}$/,
                                        message:'请输入正确的手机格式'
                                    }
                                ]}
                            >
                                <Input prefix={<PhoneOutlined className="site-form-item-icon" />} placeholder="手机号" onChange={this.handlePhone}/>
                            </Form.Item>
                            <Form.Item
                                name="idcode"
                                rules={[
                                    {
                                        pattern:/^\d{6}$/,
                                        message:'请输入正确的验证码',
                                        trigger: 'blur'
                                    },
                                ]}
                            >
                                <Input
                                    prefix={<CodeOutlined  className="site-form-item-icon"/>}
                                    // type="password"
                                    style={{width:"60%"}}
                                    placeholder="验证码"
                                    onChange={this.handleIDcode}
                                />
                                <Button  className="login-idcode-button" onClick={()=>{message.success("验证码为123456",4)}}>获取验证码</Button>
                            </Form.Item>
                            <Form.Item >
                                <Form.Item name="remember" noStyle>
                                    <Checkbox>记住我</Checkbox>
                                </Form.Item>
                                <Link className="login-form-forgot" to="/forgetPwd" id="forgetPassword">
                                    忘记密码？
                                </Link>
                                <Link className="login-form-forgot" to="/login" id="login_phone">
                                    用户名登录
                                </Link>
                            </Form.Item>
                            <ReactSimpleVerify ref="verify" success={this.slidesuccess} />
                            <div className='space' ></div>
                            <Form.Item id='buttons'>
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

export default LoginPhone;
