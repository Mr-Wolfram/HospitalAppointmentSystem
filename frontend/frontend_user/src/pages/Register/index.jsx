import React, {Component} from 'react';
import { Form, Input, Button, message} from 'antd';
import {UserOutlined, LockOutlined, MailOutlined, PhoneOutlined, CodeOutlined} from '@ant-design/icons';
import axios from "axios";
import cookie from 'react-cookies'
import login_api from "./../../commons/components/login"


class Register extends Component {
    state = {
        username: '',
        password: '',
        phone:'',
        nameRepeated: false,
        phoneRepeated: false,
        nameStyle:'',
        phoneStyle:'',
        nameHelp:null,
        phoneHelp:null,
        id1:undefined,
        id2:undefined,
        idcode:''
    }

    //用户登陆的情况下不允许注册
    componentWillMount () {
        const username = cookie.load('username')
        if (username !== undefined) window.location.href = '/index'
    }

    //清空定时器
    componentWillUnmount () {
        if (this.state.id1 !== undefined) clearTimeout(this.state.id1)
        if (this.state.id2 !== undefined) clearTimeout(this.state.id2)
    }


    //实时发送ajax请求验证用户名是否可用
    handleUsername = e => {
        const username = e.target.value
        const reg = /[0-9A-Za-z]{6,12}$/
        //判断格式
        if (username.length < 6 || !reg.test(username)) {
            this.setState({nameStyle:'warning', nameHelp:'用户名应为6-12个英文字符或数字'})
            return
        }
        //设置加载中样式
        this.setState({username, nameStyle:'validating'})
        clearTimeout(this.state.id1) //防抖
        //延时1s，增加动画效果
        let id = setTimeout(() => {
            let that = this
            // axios.post('/api/user/check/name', {
            //     username
            // })
            login_api.checkname(username)
                .then(function (response) {
                    const data = response.data
                    const result = data.data.isExist
                    // console.log(data,result);
                    if (result === true){
                        that.setState({nameRepeated:true, nameStyle:'error', nameHelp:'该用户名已存在'})
                    }
                    else{
                        that.setState({nameRepeated:false, nameStyle:'success', nameHelp:'该用户名可用'})
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }, 1000)
        this.setState({id1:id})
    }


    //实时发送ajax请求验证邮箱是否被注册
    handlePhone = e => {
        const phone = e.target.value
        const reg = /^1[3456789]\d{9}$/
        //使用邮箱的正则判断手机号格式是否符合要求
        if (!reg.test(phone)) {
            this.setState({phoneStyle:'warning', phoneHelp:'请输入正确的手机号格式'})
            return
        }
        this.setState({phone, phoneStyle:'validating'})
        clearTimeout(this.state.id2) // 防抖
        let id = setTimeout(() => {
            let that = this
            // axios.post('/api/user/check/phone', {
            //     phone
            // })
            login_api.checkphone(phone)
                .then(function (response) {
                    const data = response.data
                    const result = data.data.isExist
                    // console.log(data,result);
                    if (result === true){
                        that.setState({phoneRepeated:true, phoneStyle:'error', phoneHelp:'该手机号已被注册'})
                    }
                    else{
                        that.setState({phoneRepeated:false, phoneStyle:'success', phoneHelp:'该手机号可用'})
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }, 1000)
        this.setState({id2: id})
    }

    //自定义rules判断两次密码是否一致，需返回promise
    repeatPwd = (rule, value) => {
        if (value && value !== this.state.password) return Promise.reject('两次密码不一致')
        return Promise.resolve()
    }

    //存储密码
    handlePassword = e => {
        this.setState({password: e.target.value})
    }

    handleIDcode = e => {
        this.setState({idcode: e.target.value})
    }

    //提交表单
    handleSubmit = () => {
        let that = this
        const {username, password, phone} = that.state
        const reg1 = /[0-9A-Za-z]{6,12}$/
        const reg2 = /^1[3456789]\d{9}$/
        const reg3 = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/
        //判断提交数据格式的合法性
        if (username === '' || password === '' || phone === '' || !reg1.test(username) || !reg2.test(phone) ||
            !reg3.test(password) || this.verifyPwd !== password || this.state.nameRepeated || this.state.phoneRepeated) return
        // axios.post('/api/user/register', {
        //     username,
        //     password,
        //     phone
        // })
        if (this.state.idcode != '123456'){
            message.warning('验证码错误!')
            return;
        }
        login_api.register(username,password,phone)
            .then(function (response) {
                const data = response.data
                const result = data.data.status

                if (result === 'success'){
                    //注册成功返回登陆界面
                    cookie.save('registerSuccess', true, { path: '/' })
                    window.location.href = '/login'
                }
                else{
                    console.log("result reg",result);
                    message.warning('注册错误，请联系管理员', 3);
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render () {
        return (
            <div className={'background'}>
                <div className='myForm'>
                    <img src='./images/registerPicture.jpg' className='leftPicture' alt='leftPicture'/>
                    <div className='right'>
                        <h4 className='title'>用户注册</h4>
                        <hr className='line'/>
                        <Form
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
                                        max: 12,
                                        message: '用户名长度应为6-12个字符',
                                        trigger: 'blur'
                                    }
                                ]}
                                validateStatus={this.state.nameStyle}
                                hasFeedback
                                help={this.state.nameHelp}
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" onChange={this.handleUsername}/>
                            </Form.Item>

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
                                validateStatus={this.state.phoneStyle}
                                hasFeedback
                                help={this.state.phoneHelp}
                            >
                                <Input prefix={<PhoneOutlined className="site-form-item-icon" />} placeholder="手机号" onChange={this.handlePhone}/>
                            </Form.Item>

                            <Form.Item
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入您的密码',
                                    },
                                    {
                                        min: 6,
                                        max: 24,
                                        message: '密码长度应为8-16个字符',
                                        trigger: 'blur'
                                    },
                                    {
                                        pattern:/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/,
                                        message: '密码应包含数字和字母'
                                    }
                                ]}
                            >
                                <Input.Password
                                    prefix={<LockOutlined className="site-form-item-icon"/>}
                                    type="password"
                                    placeholder="密码"
                                    onChange={this.handlePassword}
                                />
                            </Form.Item>

                            <Form.Item
                                name="password2"
                                rules={[
                                    {
                                        required: true,
                                        message: '请再次确认密码',
                                    },
                                    {
                                        validator: this.repeatPwd
                                    }
                                ]}
                            >
                                <Input.Password
                                    prefix={<LockOutlined className="site-form-item-icon"/>}
                                    type="password"
                                    placeholder="确认密码"
                                    onChange={e => this.verifyPwd = e.target.value}
                                />
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

                            <Form.Item id='buttons'>
                                <div className='myBtn'>
                                    <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.handleSubmit}>
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

export default Register;
