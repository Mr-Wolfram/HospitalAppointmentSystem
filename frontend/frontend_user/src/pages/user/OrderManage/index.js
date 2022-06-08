import React, {Component, useEffect, useRef, useState} from 'react';
import api from "./../../../commons/index"
import {Input,Radio, Form, Col, Row, Button, Select, DatePicker, AutoComplete, Cascader, Checkbox} from 'antd';
import TableCard from './component/TableCard';
import order_api from "./../../../commons/components/orderManage"
import depart_api from "./../../../commons/components/querydeparment"
import cookie from "react-cookies";
// 'mongodb://userServer:userServer@yzhblind.top:27017';
const Search = Input.Search;
const InputGroup = Input.Group;
const Option = Select.Option;
// const department_list=["口腔矫形科","放疗科","呼吸内科","消化内科","神经内科","心血管内科",
//     "普通外科","神经外科","心胸外科","泌尿外科","儿科综合","小儿内科","小儿外科",
//     "新生儿科","中医全科","中医内科","中医外科","针灸按摩科","中医骨伤科","肝病科",
//     "艾滋病科","寄生虫科","放疗科","肿瘤综合科","骨肿瘤科","耳鼻喉科","眼科","骨科"
// ]
const checkbox_options = [
    {
        label: '支付成功',
        value: 'TRADE_SUCCESS',
    },
    {
        label: '就诊完成',
        value: 'TRADE_FINISHED',
    },
    {
        label: '等待支付',
        value: 'WAIT_BUYER_PAY',
    },
    {
        label: '订单关闭',
        value: 'TRADE_CLOSED',
    },
];
function OrderManage () {
    const [orderList,setOrderList]=useState([]);
    const [select_department,setSelect_department]=useState("");//
    const [select_doctor,setSelect_doctor]=useState("")
    const [select_order_id,setSelect_order_id]=useState("")
    const [select_status,setSelect_status]=useState("")
    const [select_start_time,setSelect_start_time]=useState("")
    const [select_end_time,setSelect_end_time]=useState("")
    const [departList,setDepartList]=useState(
        [

            "临床药理中心",
            "病理科",
            "输血科",
            "急诊医学科",
            "PET中心/核医学科",
            "放射科",
            "药剂科",
            "脑重症医学科",
            "烧伤与创面修复科",
            "泌尿外科",
            "甲状腺外科",
            "精神科",
            "儿科",
            "妇科",
            "体检中心",
            "肝胆胰外科",
            "检验科",
            "肿瘤研究所",
            "营养科",
            "综合牙科",
            "胃肠外科",
            "综合ICU",
            "产科",
            "血管外科",
            "大肠外科",
            "内分泌科",
            "心脏大血管外科",
            "男科",
            "麻醉手术部",
            "整形科",
            "神经外科",
            "口腔内科",
            "肿瘤内科",
            "耳鼻咽喉科",
            "风湿免疫科",
            "肾脏内科",
            "骨科",
            "超声医学科",
            "心血管内科",
            "呼吸内科",
            "生殖医学科",
            "口腔外科",
            "乳腺外科",
            "疼痛科",
            "消化内科",
            "外科重症医学科",
            "中医康复科",
            "重症医学科",
            "皮肤科",
            "胸外科",
            "老年病科",
            "过敏（变态反应）科",
            "放疗科",
            "医学遗传科",
            "神经内科",
            "感染性疾病科",
            "血液内科",
            "全科医学科"

    ]
    );
    const doctor_input_ref=useRef();
    useEffect(()=>{

        depart_api.getdepartstruct().then(
            r=>{
                if(r.data.status==='success'){
                    console.log(r.data.data);
                    let arr=[]
                    const res=Object.keys((r.data.data)).map((el)=>{
                        return {
                            value:el,
                            label:r.data.data[el]
                        }
                    })
                    for(let i in res){
                        arr.push(res[i].value);
                    }
                    console.log("arr",arr)
                }
            }
        )
        order_api.get_query_order(
            cookie.load("user_id"),"","","","","",""
        ).then(r=>{
                console.log("order query",r.data);
                let retData=r.data.data.map(i=>{
                    if(i.status==="WAIT_BUYER_PAY"){
                        let nowTime=new Date();
                        let thatTime=new Date(i.time);
                        if(nowTime-thatTime>=15*60){
                            // console.log("nowTime-thatTime",nowTime,thatTime,nowTime-thatTime);
                            i.status="TRADE_CLOSED";
                        }
                    }
                    if(i.status==='TRADE_SUCCESS')i.status="支付成功";
                    if(i.status==='TRADE_FINISHED')i.status="就诊完成";
                    if(i.status==='WAIT_BUYER_PAY')i.status="等待支付";
                    if(i.status==='TRADE_CLOSED')i.status="订单关闭";
                    i.time=new Date(i.time);
                    i.time=i.time.toLocaleString()
                    // i.time=i.time.getFullYear() + '-' + (i.time.getMonth() + 1) + '-' + i.time.getDate()+' '+i.time.getHours() + ':' + i.time.getMinutes() + ':' + i.time.getSeconds()

                    return i;
                })

                setOrderList(retData)
            }
        )
    },[])
    async function getOrder(user_id,order_id,doctor_name,status,department,start_date,end_date) {
        await order_api.get_query_order(user_id,order_id,doctor_name,status,department,start_date,end_date).then(r=>{
                console.log("order query by select",r.data);
            let retData=r.data.data.map(i=>{
                if(i.status==="WAIT_BUYER_PAY"){
                    let nowTime=new Date();
                    let thatTime=new Date(i.time);
                    if(nowTime-thatTime>=15*60){
                        // console.log("nowTime-thatTime",nowTime,thatTime,nowTime-thatTime);
                        i.status="TRADE_CLOSED";
                    }
                }
                if(i.status==='TRADE_SUCCESS')i.status="支付成功";
                if(i.status==='TRADE_FINISHED')i.status="就诊完成";
                if(i.status==='WAIT_BUYER_PAY')i.status="等待支付";
                if(i.status==='TRADE_CLOSED')i.status="订单关闭";
                i.time=new Date(i.time);
                i.time=i.time.toLocaleString()
                // i.time=i.time.getFullYear() + '-' + (i.time.getMonth() + 1) + '-' + i.time.getDate()+' '+i.time.getHours() + ':' + i.time.getMinutes() + ':' + i.time.getSeconds()

                return i;
            })

            setOrderList(retData)
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
                        <Col span={10}>
                            <Select
                                    showSearch
                                    style={{width:140}}
                                    onSearch={onSearchSelectDepart}
                                    placeholder="选择科室"
                                    value={select_department===""?"选择科室":select_department}
                                    onChange={(r)=>setSelect_department(r)}
                                    optionFilterProp="children"
                                    filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                            >

                                {departList.map(r=>{
                                    return <Option key={r} value={r}>{r}</Option>
                                })}
                            </Select>


                        </Col>
                        <Col span={10}>
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
                        </Col>
                    </Row>
                    <Row gutter= {[16,24]}>

                        <Col span={10}>
                            <br/>
                            <InputGroup compact>

                                <AutoComplete options={orderList.map(r=>{return {"value":r.order_id}})}
                                              value={select_order_id}
                                              onChange={data=>setSelect_order_id(data.replace(/\W/g,''))}
                                              optionFilterProp="children"
                                              filterOption={(input, option) => {
                                                  console.log("option",option,option.props,);
                                                  return option.props.value.toUpperCase().indexOf(input.toUpperCase()) !== -1
                                                }
                                              }
                                >

                                <Input.Search style={{ width: '300px' }}
                                       allowClear
                                       value={select_order_id}
                                        //optionFilterProp="children"
                                             // filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                                              placeholder={"请输入订单号"} onChange={e=>setSelect_order_id(e.target.value.replace(/\W/g,''))} />
                                </AutoComplete>
                            </InputGroup>
                        </Col>
                        <Col span={10}>
                            <br/>
                            <InputGroup compact>

                                <DatePicker
                                    placeholder={"start"}
                                    // value={select_start_time}
                                    onChange={(r,dataString)=>{
                                        console.log("date",dataString)
                                        setSelect_start_time(dataString);
                                    }} />
                                <DatePicker
                                    placeholder={"end"}
                                    // value={select_end_time}
                                    onChange={(r,dataString)=>{
                                        setSelect_end_time(dataString);
                                    }} />
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row gutter= {[16,24]}>
                        <Col span={10}>
                        <br />
                        <Radio.Group defaultValue="" value={select_status}  size="large" onChange={r=>setSelect_status(r.target.value)}>
                            <Radio.Button value="TRADE_SUCCESS">支付成功</Radio.Button>
                            <Radio.Button value="TRADE_FINISHED">就诊完成</Radio.Button>
                            <Radio.Button value="WAIT_BUYER_PAY">等待支付</Radio.Button>
                            <Radio.Button value="TRADE_CLOSED">订单关闭</Radio.Button>
                        </Radio.Group>
                        <br />
                        </Col>
                        <Col span={10}>
                            <Button style={{
                                position:"relative",top:30,margin:5,width:100,height:30,
                                fontSize:16,backgroundColor:"#1890ff",color:"white"}}
                                    onClick={()=>{
                                        getOrder(
                                            cookie.load("user_id"),select_order_id,select_doctor,select_status,
                                            select_department,select_start_time,select_end_time
                                        )
                                    }}
                            >
                                筛选查询
                            </Button>
                            <Button style={{position:"relative",top:30,margin:5,width:100,height:30,fontSize:16,backgroundColor:"#1890ff",color:"white"}}
                                    onClick={()=>{
                                        setSelect_department("");
                                        setSelect_doctor("");
                                        setSelect_end_time("");
                                        setSelect_status("");
                                        setSelect_start_time("")
                                        setSelect_order_id("")

                                        // doctor_input_ref.current.input.value=''
                                        // console.log(doctor_input_ref.current)
                                        getOrder(
                                            cookie.load("user_id"),"","","",
                                            "","",""
                                        )
                                    }}
                            >
                                清空条件
                            </Button>
                        </Col>
                    {/*<InputGroup compact>*/}
                    {/*    <Select defaultValue="状态选择" value={select_status===""?"状态选择":select_status} onChange={(r)=>setSelect_status(r)}>*/}
                    {/*        <Option value="TRADE_SUCCESS">支付成功</Option>*/}
                    {/*        <Option value="TRADE_FINISHED">就诊完成</Option>*/}
                    {/*        <Option value="WAIT_BUYER_PAY">待支付</Option>*/}
                    {/*        <Option value="TRADE_CLOSED">订单关闭</Option>*/}
                    {/*    </Select>*/}
                    {/*</InputGroup>*/}

                    </Row>

                    <br/>
                    <TableCard orderList={orderList} />
                    </div>

                </div>
            </div>
        );

}

export default OrderManage;
