import React, {Component, useEffect, useRef, useState} from 'react';
import api from "./../../../commons/index"
import { Input,Form, Col,Row, Button,Select, DatePicker, AutoComplete, Cascader } from 'antd';
import TableCard from './component/TableCard';
import order_api from "./../../../commons/components/orderManage"
import cookie from "react-cookies";

const Search = Input.Search;
const InputGroup = Input.Group;
const Option = Select.Option;
const department_list=["放疗科","呼吸内科","消化内科","神经内科","心血管内科",
    "普通外科","神经外科","心胸外科","泌尿外科","儿科综合","小儿内科","小儿外科",
    "新生儿科","中医全科","中医内科","中医外科","针灸按摩科","中医骨伤科","肝病科",
    "艾滋病科","寄生虫科","放疗科","肿瘤综合科","骨肿瘤科","耳鼻喉科","眼科","口腔科","骨科"
]
function OrderManage () {
    const [orderList,setOrderList]=useState([]);
    const [select_department,setSelect_department]=useState("");//
    const [select_doctor,setSelect_doctor]=useState("")
    const [select_order_id,setSelect_order_id]=useState("")
    const [select_status,setSelect_status]=useState("")
    const [select_start_time,setSelect_start_time]=useState("")
    const [select_end_time,setSelect_end_time]=useState("")
    const doctor_input_ref=useRef();
    useEffect(()=>{
        order_api.get_query_order(
            cookie.load("user_id"),"","","","","",""
        ).then(r=>{
                console.log("order query",r.data);
                let retData=r.data.data.map(i=>{
                    if(i.status==="WAIT_BUYER_PAY"){
                        let nowTime=new Date();
                        let thatTime=new Date(i.time);
                        if(nowTime-thatTime>=15*60){
                            console.log("nowTime-thatTime",nowTime,thatTime,nowTime-thatTime);
                            i.status="TRADE_CLOSED";
                        }
                    }
                    return i;
                })

                setOrderList(retData)
            }
        )
    },[])
    async function getOrder(user_id,order_id,doctor_name,status,department,start_date,end_date) {
        await order_api.get_query_order(user_id,order_id,doctor_name,status,department,start_date,end_date).then(r=>{
                console.log("order query by select",r.data);
                setOrderList(r.data.data)
            }
        )
    }

    function onSearchSelectDepart(param) {
        console.log("onSearchSelectDepart",param)
    }

    return (
            <div >
                <div>
                <div>
                    <Row gutter= {[16,24]}>
                        <Col span={5}>
                            <Select
                                    showSearch
                                    style={{width:100}}
                                    onSearch={onSearchSelectDepart}
                                    placeholder="选择科室"
                                    value={select_department===""?"选择科室":""}
                                    onChange={(r)=>setSelect_department(r)}
                                    optionFilterProp="children"
                                    filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                            >

                                {department_list.map(r=>{
                                    return <Option key={r} value={r}>{r}</Option>
                                })}
                            </Select>
                            {/*<AutoComplete options={department_list.map(r=>{return {"value":r}})} placeholder={"输入选择"}*/}
                            {/*    onChange={(data)=>setSelect_department(data)}*/}
                            {/*/>*/}

                        </Col>
                        <Col span={10}>
                            {/*<Form.Item*/}
                            {/*    name="doctor_name"*/}
                            {/*    rules={[*/}
                            {/*        {*/}
                            {/*            required: true,*/}
                            {/*            message: '请输入医生名字',*/}
                            {/*            trigger: 'blur'*/}
                            {/*        },*/}
                            {/*        {*/}
                            {/*            min: 2,*/}
                            {/*            max: 10,*/}
                            {/*            message: '医生名长度应为2-10个字符',*/}
                            {/*            trigger: 'blur'*/}
                            {/*        }*/}
                            {/*    ]}*/}
                            {/*>*/}
                            <Input
                                ref={doctor_input_ref}
                                style={{ width: '80wh' }} onChange={(event)=>{
                                // console.log("input event",event.target.value);
                                if(event && event.target && event.target.value){
                                    let value = event.target.value;
                                    setSelect_doctor(value)
                                }
                            }}
                                value={select_doctor}
                                   showCount maxLength={10} minLength={2}
                                   placeholder={"医生名字"}
                            />
                            {/*</Form.Item>*/}
                        </Col>
                    </Row>
                    <Row gutter= {[16,24]}>
                        <Col span={5}>
                            <Select defaultValue="订单号">
                                <Option value="订单号">订单号</Option>
                                <Option value="药单号">药单号</Option>
                            </Select>
                        </Col>
                        <Col span={16}>
                            <InputGroup compact>
                                {/*<Input style={{ width: '50px' }} defaultValue="zd" />*/}
                                <Input style={{ width: '300px' }}
                                       allowClear
                                       value={select_order_id}
                                       placeholder={"请输入订单号"} onChange={e=>setSelect_order_id(e.target.value.replace(/\W/g,''))} />
                            </InputGroup>
                        </Col>

                    </Row>
                    <Row>

                    <br/>
                    <InputGroup compact>
                        {/* <Select defaultValue="Option1">
                            <Option value="Option1">Option1</Option>
                            <Option value="Option2">Option2</Option>
                        </Select>
                        <Input style={{ width: '50%' }} defaultValue="input content" />
                        <InputNumber /> */}
                    </InputGroup>
                    <br />

                    <InputGroup compact>
                        <Select defaultValue="状态选择" value={select_status===""?"状态选择":select_status} onChange={(r)=>setSelect_status(r)}>
                            <Option value="TRADE_SUCCESS">支付成功</Option>
                            <Option value="TRADE_FINISHED">就诊完成</Option>
                            <Option value="WAIT_BUYER_PAY">待支付</Option>
                            <Option value="TRADE_CLOSED">订单关闭</Option>
                        </Select>
                    </InputGroup>
                    <br />
                        {/*<InputGroup compact>*/}
                        {/*    /!* <Input style={{ width: '50%' }} defaultValue="input content" /> *!/*/}
                        {/*    <Button >日期选择</Button>*/}
                        {/*    <DatePicker onChange={(r)=>{*/}
                        {/*        setSelect_start_time(r);*/}
                        {/*        setSelect_end_time(r);*/}
                        {/*    }} />*/}
                        {/*</InputGroup>*/}
                        <br />
                    <InputGroup compact>

                        <DatePicker
                            placeholder={"start"}
                            value={select_start_time}
                            onChange={(r)=>{
                            setSelect_start_time(r);
                        }} />
                        <DatePicker
                            placeholder={"end"}
                            value={select_end_time}
                            onChange={(r)=>{
                            setSelect_end_time(r);
                        }} />
                        {/*<Input style={{ width: 100, textAlign: 'center' }} placeholder="Minimum" />*/}
                        {/*<Input style={{ width: 24, borderLeft: 0, pointerEvents: 'none', backgroundColor: '#fff' }} placeholder="~" disabled />*/}
                        {/*<Input style={{ width: 100, textAlign: 'center', borderLeft: 0 }} placeholder="Maximum" />*/}
                    </InputGroup>
                    <br />

                    <br />
                    </Row>
                    <Button style={{position:"absolute",right:"40%",top:"19%",width:100,height:30,fontSize:16,backgroundColor:"#1890ff",color:"white"}}
                        onClick={()=>{
                        getOrder(
                            cookie.load("user_id"),select_order_id,select_doctor,select_status,
                            select_department,select_start_time,select_end_time
                        )
                    }}
                    >
                        筛选查询
                    </Button>
                    <Button style={{position:"absolute",right:"30%",top:"19%",width:100,height:30,fontSize:16,backgroundColor:"#1890ff",color:"white"}}
                            onClick={()=>{
                                setSelect_department("");
                                setSelect_doctor("");
                                setSelect_end_time("");
                                setSelect_status("");
                                setSelect_start_time("")
                                setSelect_order_id("")

                                // doctor_input_ref.current.input.value=''
                                console.log(doctor_input_ref.current)
                                getOrder(
                                    cookie.load("user_id"),"","","",
                                    "","",""
                                )
                            }}
                    >
                        清空条件
                    </Button>

                        {/* <InputGroup compact>
                        <Select style={{ width: '30%' }} defaultValue="Home">
                            <Option value="Home">Home</Option>
                            <Option value="Company">Company</Option>
                        </Select>
                        <Cascader style={{ width: '70%' }} options={options} placeholder="Select Address" />
                        </InputGroup> */}


                    <TableCard orderList={orderList} />
                    </div>

                </div>
            </div>
        );

}

export default OrderManage;
