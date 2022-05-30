import React, {Component} from 'react';
// import Header from "./components/Header";
import Login from "./pages/Login";
import cookie from 'react-cookies';
import {Route, Switch, Redirect} from 'react-router-dom'
import {message} from 'antd';
import Index from "./pages/Index";
import Register from "./pages/Register";
import ForgetPwd from "./pages/ForgetPwd";
// import LabelImg from "./pages/LabelImg";

import './App.css'
import LoginPhone from "./pages/Login/LoginPhone";
import tmp from "./pages/user/IndexPage/html/tmp";
import News00001 from './pages/user/IndexPage/news/news00001/news00001';
import News00002 from './pages/user/IndexPage/news/news00002/news00002';
import News00003 from './pages/user/IndexPage/news/news00003/news00003';

class App extends Component {
    state = {
        username: cookie.load('username')
    }

    //从cookie中判断是否是第一次进入首页
    componentDidMount () {
        const success = cookie.load('loginSuccess')
        if (success !== undefined) {
            message.success('登陆成功。欢迎您，' + this.state.username, 2)
                .then(value => console.log(value), reason => console.log(reason))
            cookie.remove('loginSuccess',{ path: '/' })
        }
    }

    render () {
        return (
            <div>
                {
                    this.state.username !== undefined ? <div/> : <div/>
                }
                <Switch>
                    <Route path="/index" component={Index} />
                    <Route path="/login" component={Login} />
                    <Route path="/login_phone" component={LoginPhone} />
                    <Route path="/register" component={Register} />
                    <Route path="/forgetPwd" component={ForgetPwd} />
                    <Route path="/html/tmp" component={tmp}/>
                    <Route path="/news/news00001" component={News00001}/>
                    <Route path="/news/news00002" component={News00002}/>
                    <Route path="/news/news00003" component={News00003}/>
                    {/*<Route path="/labelimg" component={LabelImg} />*/}
                    <Redirect to={this.state.username ? "/login" : "/index"}/>
                </Switch>
            </div>
        );
    }
}


export default App;
