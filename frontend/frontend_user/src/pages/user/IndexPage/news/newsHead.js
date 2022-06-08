import React from 'react';
import { Typography, Divider} from 'antd';
import { render } from 'react-dom';
import { Statistic, Card,Row, Col, Avatar,Layout } from 'antd';
import { Image } from 'antd';
import './news.css'
import head_img from './img/head_img.jpg'
import cookie from "react-cookies";
import Icon, {UserOutlined, BellOutlined} from "@ant-design/icons";
import logo from "../../../../images/logo.png"
import { Menu} from 'antd';

const { SubMenu } = Menu;

const { Title, Paragraph, Text, Link } = Typography;

const { Header, Content } = Layout;

class NewsHead extends React.Component{
    render(){
        return(<div><Header className="header" >

        {/*<div className="left-content">*/}
        {/*    {React.createElement(this.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {*/}
        {/*        className: 'trigger',*/}
        {/*        onClick: ()=>this.setState({collapsed:!this.state.collapsed})*/}
        {/*    })}*/}
        {/*    /!*<Bread route={props} />*!/*/}
        {/*</div>*/}
        <div style={{position:'absolute',right:'10%',color:'white'}}>




        </div>
        <div className="logo" >

            <div style={{position:"absolute",width:210,top:0,left:280,height:10,fontSize:17}}>
                <img src={logo} alt={logo} width={28} />&nbsp;&nbsp;&nbsp;老和山智能医疗平台</div>
        </div>
        <div style={{position:"absolute",width:130,top:10,right:200,height:20,}} >

        </div>

    </Header>


<div class="nav">
<div class="w1200">
<div class="nav_class">
<ul class="nav_menu">
      <li class="nav_menu-item active"><a class="t" href=''>首页</a></li>

<li class="nav_menu-item"><a class="t" href='' target="_self">院情总览</a>

    <ul class="nav_submenu">


        <li class="nav_submenu-item"><a href="" target="_self">本院概况</a></li>


        <li class="nav_submenu-item"><a href="" target="_self">本院领导</a></li>


        <li class="nav_submenu-item"><a href="" target="_self">机构设置</a></li>


        <li class="nav_submenu-item"><a href="" target="_self">本院黄页</a></li>

    </ul>



    </li>

<li class="nav_menu-item"><a class="t"  href="" target="_self">人事信息</a>

    <ul class="nav_submenu">


        <li class="nav_submenu-item"><a href="" target="_self">组织工作</a></li>


        <li class="nav_submenu-item"><a href="" target="_self">人事工作</a></li>

    </ul>



    </li>

<li class="nav_menu-item"><a class="t"  href="" target="_self">科研进展</a>

    <ul class="nav_submenu">


        <li class="nav_submenu-item"><a href="" target="_self">最新通知</a></li>


        <li class="nav_submenu-item"><a href="" target="_self">新闻动态</a></li>


        <li class="nav_submenu-item"><a href="" target="_self">公示信息</a></li>


        <li class="nav_submenu-item"><a href="" target="_self">科研政策</a></li>


        <li class="nav_submenu-item"><a href="" target="_self">科研成果</a></li>


        <li class="nav_submenu-item"><a href="" target="_self">办事流程</a></li>


        <li class="nav_submenu-item"><a href="" target="_self">文件下载</a></li>

    </ul>



    </li>


<li class="nav_menu-item"><a class="t"  href="" target="_self">院方工作</a>

    <ul class="nav_submenu">


        <li class="nav_submenu-item"><a href="" target="_self">最新消息</a></li>


        <li class="nav_submenu-item"><a href="" target="_self">新闻动态</a></li>


        <li class="nav_submenu-item"><a href="" target="_self">党建工作</a></li>


        <li class="nav_submenu-item"><a href="" target="_self">团建工作</a></li>


        <li class="nav_submenu-item"><a href="" target="_self">院方事务</a></li>


        <li class="nav_submenu-item"><a href="" target="_self">院方组织</a></li>


        <li class="nav_submenu-item"><a href="" target="_self">院方活动</a></li>


        <li class="nav_submenu-item"><a href="" target="_self">文件下载</a></li>

    </ul>



    </li>

<li class="nav_menu-item"><a class="t"  href="" target="_self">人事招聘</a>

    <ul class="nav_submenu">


        <li class="nav_submenu-item"><a href="" target="_self">最新通知</a></li>


        <li class="nav_submenu-item"><a href="" target="_self">重点引导</a></li>


        <li class="nav_submenu-item"><a href="" target="_self">新闻动态</a></li>


        <li class="nav_submenu-item"><a href="" target="_self">招聘信息</a></li>


        <li class="nav_submenu-item"><a href="" target="_self">实习招聘</a></li>



    </ul>



    </li>

<li class="nav_menu-item"><a class="t"  href="" target="_self">交流合作</a>

    <ul class="nav_submenu">


        <li class="nav_submenu-item"><a href="" target="_self">医师国际交流</a></li>


        <li class="nav_submenu-item"><a href="" target="_self">合作交流动态</a></li>


        <li class="nav_submenu-item"><a href="" target="_self">学术讲座</a></li>


        <li class="nav_submenu-item"><a href="" target="_self">外国专家</a></li>


        <li class="nav_submenu-item"><a href="" target="_self">国际会议</a></li>

    </ul>



    </li>

<li class="nav_menu-item"><a class="t"  href="" target="_self">事务中心</a>

    <ul class="nav_submenu">


        <li class="nav_submenu-item"><a href="" target="_self">最新通知</a></li>


        <li class="nav_submenu-item"><a href="" target="_self">新闻动态</a></li>


        <li class="nav_submenu-item"><a href="" target="_self">中心简介</a></li>




        <li class="nav_submenu-item"><a href="" target="_self">合作捐赠</a></li>



        <li class="nav_submenu-item"><a href="" target="_self">信息公告</a></li>

    </ul>



    </li>

<li class="nav_menu-item"><a class="t"  href="" target="_self">综合服务</a>

    <ul class="nav_submenu">


        <li class="nav_submenu-item"><a href="" target="_self">服务指南</a></li>


        <li class="nav_submenu-item"><a href="" target="_self">文件下载</a></li>

    </ul>



    </li>


</ul>
<div class="clear"></div>
</div>

<div class="clear"></div>
</div>
</div>
<Image src={head_img} ></Image></div>)
    }
}
export default NewsHead;
