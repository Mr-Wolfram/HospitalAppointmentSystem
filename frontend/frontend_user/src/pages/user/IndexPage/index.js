import React,{Component} from 'react';
import {
    MessageOutlined,
    LikeOutlined,
    StarOutlined,
    CommentOutlined,
    SoundOutlined,
    HeartOutlined, MailOutlined
} from '@ant-design/icons';
import ProList from '@ant-design/pro-list';
import {Input, Tag, Button, Select, InputNumber, DatePicker, AutoComplete, Cascader, Carousel} from 'antd';
import { Timeline } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import { Statistic, Card, Row, Col } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { Popover } from 'antd';
import { List, Avatar } from 'antd';


const Search = Input.Search;
const InputGroup = Input.Group;
const Option = Select.Option;


const data = [
    {
        title: "媒体报道",
        srcimg:<CommentOutlined />,
        dis:"都市快报 小朋友害怕做核酸，这群援沪“大白”化身“奥特曼” 花式“宠”娃"
    },
    {
        title: '党群工作',
        srcimg: <MailOutlined />,
        dis:"第二党支部:召开202年度党员领导干部民主生活"
    },
    {
        title: '查询热线',
        srcimg: <HeartOutlined />,
        dis:"核酸检查在线查询"
    },
    {
        title: '媒体报道',
        srcimg:<SoundOutlined />,
        dis:"光明日报客户端 浙大邵逸夫医院：远程“云急救”助推基层医疗服务能力提升"
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
    },
    {
        title: '医疗进展',
    },
    {
        title: '献血招募',
    },
    {
        title: '住院部改造公告',
    },
];
const imgH=550;
const content = (
    <div>
        <p>综合</p>
        <p>血氧</p>
        <p>睡眠</p>
        <p>心率</p>
    </div>
);
class IndexPage extends Component {
    state = {
        dataSource: [],
    }
    handleChange = (value) => {
        this.setState({
            dataSource: !value || value.indexOf('@') >= 0 ? [] : [
                `${value}@gmail.com`,
                `${value}@163.com`,
                `${value}@qq.com`,
            ],
        });
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
                                    <List.Item>
                                        <List.Item.Meta
                                            avatar={item.srcimg}
                                            title={<a href="https://ant.design">{item.title}</a>}
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


                        <div
                            // className="site-statistic-demo-card"
                        >
                            <Row gutter={18}>
                                <Col span={9} offset={1}>
                                    <Timeline>
                                        <Timeline.Item>2022-03-04 8:09 修改绑定邮箱</Timeline.Item>
                                        <Timeline.Item>2022-04-01 16:30  挂号:外科 李明医生</Timeline.Item>
                                        <Timeline.Item dot={<ClockCircleOutlined className="timeline-clock-icon" />} color="red">
                                            2022-04-02 16:50 订单生成 待取药
                                        </Timeline.Item>
                                        <Timeline.Item>2022-04-02 16:57 订单已支付</Timeline.Item>
                                    </Timeline>
                                </Col>
                                <Col span={6}>
                                    <Card>
                                        <Statistic
                                            title="健康指数"
                                            value={11.28}
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
                                            value={9.3}
                                            precision={2}
                                            valueStyle={{ color: '#cf1322' }}
                                            prefix={<ArrowDownOutlined />}
                                            suffix="%"
                                        />
                                    </Card>
                                </Col>
                                <Col span={2}>
                                    <Popover content={content} title="Title">
                                        <Button type="primary" style={{marginBottom:30}}>其他</Button>

                                    </Popover>
                                    <Button type="primary">更新</Button>
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
                    itemLayout="vertical" rowKey="id" headerTitle="新闻动态" dataSource={dataSource} metas={{
                    title: {},
                    description: {
                        render: () => (<>
                            <Tag>党群工作</Tag>
                            <Tag>医疗科研</Tag>
                            <Tag>健康促进</Tag>
                        </>),
                    },
                    actions: {
                        render: () => [
                            <IconText icon={StarOutlined} text="156" key="list-vertical-star-o"/>,
                            <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o"/>,
                            <IconText icon={MessageOutlined} text="2" key="list-vertical-message"/>,
                        ],
                    },
                    extra: {
                        render: () => (<img width={172} height={100} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"/>),
                    },
                    content: {
                        render: () => {
                            return (<div>
                                新闻动态
                            </div>);
                        },
                    },
                }}/>
            </div>
        );
    }
}

export default IndexPage;
