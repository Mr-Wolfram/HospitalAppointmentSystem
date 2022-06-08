import React,{Component} from 'react';
import {
    MessageOutlined,
    LikeOutlined,
    StarOutlined,
    CommentOutlined,
    SoundOutlined,
    HeartOutlined, MailOutlined, ConsoleSqlOutlined
} from '@ant-design/icons';
import ProList from '@ant-design/pro-list';
import {Input, Tag, Button, Select, InputNumber, DatePicker, AutoComplete, Cascader, Carousel, Layout} from 'antd';
import { Timeline } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import { Statistic, Card, Row, Col } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, UserOutlined } from '@ant-design/icons';
import { Popover } from 'antd';
import { List, Avatar } from 'antd';
import user_action_api from "./../../../commons/components/indexPage"
import user_info_api from "./../../../commons/components/userinfo"
import './index.css'
import cookie from 'react-cookies'
import { Skeleton } from 'antd';

import {Route, Switch} from "react-router-dom";
// import News1 from './component/News1'

const Search = Input.Search;
const InputGroup = Input.Group;
const Option = Select.Option;
const user_id = cookie.load('user_id')

const data = [
    {
        title: "媒体报道",
        srcimg:<CommentOutlined />,
        dis:"奋战30天采样160万人次！248位浙一援沪核酸采样医疗一队队员，欢迎回家！",
        src:"/news/news00001"
    },
    {
        title: '党群工作',
        srcimg: <MailOutlined />,
        dis:"第二党支部召开2020年度党员领导干部民主生活会",
        src:"/news/news00002"
    },
    {
        title: '查询热线',
        srcimg: <HeartOutlined />,
        dis:"核酸检查在线查询",
        src:"/news/news00003"
    },
    {
        title: '通知公告',
        srcimg:<SoundOutlined />,
        dis:"关于全国卫生系统先进集体先进工作者推荐对象公示的通告",
        src:"/news/news00003"
    },
];
const IconText = ({ icon, text }) => (<span>
    {React.createElement(icon, { style: { marginRight: 8 } })}
    {text}
  </span>);
const contentStyle = {
    height: '300px',
    color: '#fff',
    lineHeight: '300px',
    textAlign: 'center',
    background: '#364d79',
};
const dataSource = [
    {
        title: '交流合作',
        description:['对外沟通','交流项目','协同发展'],
        extra:{imageSrc:"http://5b0988e595225.cdn.sohucs.com/images/20190125/ad945d8a0f104a618c04c5ab67e96a4a.jpeg"},
        content:"我院开展第十期交流活动"
    },
    {
        title: '医疗进展',
        description:['进展速递','前沿资讯','智能医疗'],
        extra:{imageSrc:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ffile.elecfans.com%2Fweb1%2FM00%2FC8%2FF7%2FpIYBAF9wMISAPoo4AAHkWknHs_s938.jpg&refer=http%3A%2F%2Ffile.elecfans.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1655983877&t=b9b92a5907d67bf62f226409e8746376"},
        content:"AI+X助力智能医疗"
    },
    {
        title: '献血招募',
        description:['献血咨询','信息查询','证书领取'],
        extra:{imageSrc:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.jsgkw.org%2Fuploadfile%2F2021%2F0729%2F20210729095735590.jpeg&refer=http%3A%2F%2Fwww.jsgkw.org&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1655983918&t=cf23ef9834420a159f318ee52c9360c7"},
        content:"招募志愿者"
    },
    {
        title: '住院部改造公告',
        description:['最新公告','项目公示','改造信息'],
        extra:{imageSrc:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fzgxyjjboss.newaircloud.com%2Fzgxyjjb%2Fupload%2F202105%2F02%2F2b210ffc-0fa3-4307-bbff-b2eede39dc7b.jpg&refer=http%3A%2F%2Fzgxyjjboss.newaircloud.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1655983834&t=005a4b3be7fda9ec84d69b3260899f72"},
        content:"住院部A区改造公告"
    },
];
const imgH=550;
class IndexPage extends Component {
    constructor(props){
        super(props);
        // user_info_api.get_userinfo("123")
        // .then(ret =>{
        //     this.setState({userInfoTotal:ret.data.data
        //     })
        // })
        // this.state.user_name=this.state.userInfoTotal.username
        // console.log("userinfo",this.state.userInfoTotal)
        user_info_api.get_avatar(user_id).then(
           ret=>{
               console.log("ret",ret)
               this.setState({
                   user_avatar_src:ret.data.data.url,
               })
           }
        )
        user_info_api.get_userinfo(user_id).then(
            ret=>{
                console.log("ret",ret)
                this.setState({
                    user_name:ret.data.data.username
                })
            }
        )
    }

    state = {
        dataSource: [],
        healthInfo:[
            {total:"00.00",change_rate:0},
            {pulse_oximeter:"00.00",change_rate:0},
            {sleep_quality:"00.00",change_rate:0},
            {heart_rate:"00.00",change_rate:0}
        ],
        userAction:[
            {timestamp:"2022-03-04 08:09",description:"修改绑定邮箱"},
            {timestamp:"2022-04-01 16:03",description:"挂号：外科 李明医生"},
            {timestamp:"2022-04-03 20:10",description:"订单创建成功 等待缴费"},
            {timestamp:"2022-04-03 23:01",description:"订单缴费成功"}
        ],
        userInfoTotal:{},
        user_avatar_src:"https://joeschmoe.io/api/v1/random",
        user_name:"User001"

    }

    updateAction = () =>{
        // user_action_api.post_useraction("123")
        // .then( ret =>{
        //     console.log("debug",ret.data.data)
        //     console.log("action",this.state.userAction)
        //     this.setState({userAction:ret.data.data
        //     })
        // })
        // user_action_api.post_userhealthinfo("123")
        // .then( ret =>{
        //     this.setState({
        //         healthInfo:ret.data.data
               
        //     })
        //     console.log("info",ret.data.data)
        // })
    }
    openNewWindow = (src) =>{
        console.log("src",src)
        window.open(src,"_blank")
    }

    render () {
        return (
            <div >

                <div>
                    <Row gutter={30} >
                        <Col span={10}>
                            <Carousel autoplay>
                                <div>
                                    <img src={"http://www.srrsh.com/data/attachment/202203/17/77a65b5c688ab1f77f4c99bf0b53f2eb.jpg"}
                                         width={imgH}
                                         style={contentStyle}
                                    />
                                    {/*<h3 style={contentStyle}>1</h3>*/}
                                </div>
                                <div>
                                    <img src={"http://www.srrsh.com/ewebeditor/uploadfile/20220427135323159001.png"}
                                         width={imgH}
                                         style={contentStyle}
                                    />
                                    {/*<h3 style={contentStyle}>2</h3>*/}
                                </div>
                                <div>
                                    <img src={"http://www.srrsh.com/ewebeditor/uploadfile/20220427135325448002.png"}
                                         width={imgH}
                                         style={contentStyle}
                                    />
                                    {/*<h3 style={contentStyle}>3</h3>*/}
                                </div>
                                <div>
                                    <img src={"http://www.srrsh.com/data/attachment/201804/18/e12b2862cabeeaa177e445e70ddce896.png"}
                                         width={imgH}
                                         style={contentStyle}
                                    />
                                    {/*<h3 style={contentStyle}>4</h3>*/}
                                </div>
                            </Carousel>
                        </Col>
                        <Col span={14}>
                            <List
                                itemLayout="horizontal"
                                dataSource={data}
                                style={{backgroundColor:'#ffffff',padding:10}}
                                renderItem={item => (
                                    <List.Item onClick={this.openNewWindow.bind(this,item.src)}>
                                        <List.Item.Meta
                                            avatar={item.srcimg}
                                            title={<a>{item.title}</a>}
                                            description={item.dis}
                                        />
                                    </List.Item>
                                )}
                            />
                        </Col>
                    </Row>
                </div>
                <br/>
                <div>
                        <div>

                            <Row gutter={18}>
                                <Col span={3}>
                                <Row>
                                    <a href='/index/userinfo'>
                                        <Avatar size={128} icon={<UserOutlined />} src={this.state.user_avatar_src} className='avatar-type'/>
                                    </a>
                                </Row>
                                <Row className='welcome-info'>
                                    <p >Welcome, {this.state.user_name}!</p>
                                </Row>
                                </Col>
                                <Col span={7} offset={0}>
                                    <Timeline >
                                        <Timeline.Item>
                                        {this.state.userAction[0].timestamp} {this.state.userAction[0].description}
                                        </Timeline.Item>
                                        <Timeline.Item>
                                        {this.state.userAction[1].timestamp} {this.state.userAction[1].description}
                                        </Timeline.Item>
                                        <Timeline.Item>
                                        {this.state.userAction[2].timestamp} {this.state.userAction[2].description}
                                        </Timeline.Item>
                                        <Timeline.Item>
                                        {this.state.userAction[3].timestamp} {this.state.userAction[3].description}
                                        </Timeline.Item>
                                    </Timeline>
                                    
                                   
                                </Col>
                                <Col span={6}>
                                    <Card>
                                        <Statistic
                                            title="健康指数"
                                            value={this.state.healthInfo[0].total}
                                            precision={2}
                                            valueStyle={{ color: '#3f8600' }}
                                            prefix={<ArrowUpOutlined />}
                                            suffix="%"
                                        />
                                    </Card>
                                </Col>
                                <Col span={6}>
                                    <Card>
                                        <Statistic
                                            title="睡眠警告"
                                            value={this.state.healthInfo[2].sleep_quality}
                                            precision={2}
                                            valueStyle={{ color: '#cf1322' }}
                                            prefix={<ArrowDownOutlined />}
                                            suffix="%"
                                        />
                                    </Card>
                                </Col>
                                <Col span={2}>
                                    <Row>
                                        <Popover content={(<div>
                                            <p>综合 {this.state.healthInfo[0].total}</p>
                                            <p>血氧 {this.state.healthInfo[1].pulse_oximeter}</p>
                                            <p>睡眠 {this.state.healthInfo[2].sleep_quality}</p>
                                            <p>心率 {this.state.healthInfo[3].heart_rate}</p>
                                            </div>)} title="所有指标">
                                            <Button type="primary" style={{marginBottom:30}}>其他</Button>
                                        </Popover>
                                    </Row>
                                    <Row>
                                        <Button type="primary"  onClick={this.updateAction} >更新</Button>
                                    </Row>

                                    {/*<Popover content={content} title="Title">*/}
                                    {/*    <Button type="primary">Hover me</Button>*/}
                                    {/*</Popover>*/}
                                </Col>
                            </Row>

                        </div>



                </div>
                <ProList
                    //     toolBarRender={() => {
                    //     return [
                    //         <Button key="3" type="primary">
                    //             新建
                    //         </Button>,
                    //     ];
                    // }}
                    itemLayout="vertical" rowKey="id" headerTitle="栏目一览" dataSource={dataSource} metas={{
                    title: {},
                    description: {
                        render: (item) => (<>
                            <Tag> {item[0]} </Tag>
                            <Tag> {item[1]} </Tag>
                            <Tag> {item[2]}</Tag>
                        </>),
                    },
                    actions: {
                        render: (item) => {
                            return [
                            <IconText icon={StarOutlined} text="123" key="list-vertical-star-o"/>,
                            <IconText icon={LikeOutlined} text="100" key="list-vertical-like-o"/>,
                            <IconText icon={MessageOutlined} text="50" key="list-vertical-message"/>,
                            ]
                        },
                    },
                    extra: {
                        render: (item) => (<img width={172} height={100} alt="logo" src={item.imageSrc}/>),
                    },
                    content: {
                        render: (item) => {
                            return (<div>
                                {item}
                            </div>);
                        },
                    },
                }}/>
            </div>
        );
    }
}

export default IndexPage;
