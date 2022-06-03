import React, {Component, useState, useEffect} from 'react';
import { Descriptions, Badge, Layout, Form, Radio,InputNumber } from 'antd';
import { Button, Menu, Modal,Input, message, Upload, Popover} from 'antd';
import "./index.css"
import { Avatar } from 'antd';
import axios from "axios";
import userinfo_api from "./../../commons/components/userinfo"
import { ConsoleSqlOutlined, UserOutlined, PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import src from 'react-map-gl';
import FormItem from 'antd/lib/form/FormItem';
import cookie from 'react-cookies'
const { Header, Content, Sider } = Layout;


// function Changephone(){
//         userinfo_api.get_userinfo("1").then(r=>
//             console.log("order query",r.data)
//         )
// }

const { TextArea } = Input;
const user_id = cookie.load('user_id')

function Userinfo(){

    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
      };
      
      const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      
        if (!isJpgOrPng) {
          message.error('You can only upload JPG/PNG file!');
        }
      
        const isLt2M = file.size / 1024 / 1024 < 2;
      
        if (!isLt2M) {
          message.error('Image must smaller than 2MB!');
        }
      
        return isJpgOrPng && isLt2M;
      };

      const [userAvatar, setuserAvatar] = useState("https://joeschmoe.io/api/v1/random");

      const Setimg = () => {
        const [loading, setLoading] = useState(false);
        const [imageUrl, setImageUrl] = useState();
      
        const handleChange = (info) => {
          if (info.file.status === 'uploading') {
            setLoading(true);
            return;
          }
      
          if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, (url) => {
              setLoading(false);
              setImageUrl(url);
              setuserAvatar(url)
              console.log(url)
            });
          }

          
        };

        function changeurl(file){
          getBase64(file,(url)=>{return url})
        }

        const params = {
          name: "avatar",
          headers: {"Authorization" : cookie.load('token')},
          listType:"picture-card",
          className:"avatar-uploader",
          showUploadList:false,
        };
        let a = "http://localhost:3000/api/user/info/avatar?user_id="+cookie.load('user_id')
      
        const uploadButton = (
          <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div
              style={{
                marginTop: 8,
              }}
            >
              Upload
            </div>
          </div>
        );
        return (
          <Upload
            // name="avatar"
            // listType="picture-card"
            // className="avatar-uploader"
            // showUploadList={false}
             action={a}
            data={file=>({usr_id:cookie.load('user_id'),pic_id:file})}
            // headers={{"Authorization" : cookie.load('token')}}
            {...params}
             beforeUpload={beforeUpload}
             onChange={handleChange}

          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="avatar"
                style={{
                  width: '100%',
                }}
              />
            ) : (
              uploadButton
            )}
          </Upload>
        );
      };

    /***以上为上传图片***/ 

    const[phoneStyle, setphoneStyle] = useState('');
    const[phonehelp, setphonehelp] = useState('')
    const[changephone, setchangephone] = useState("")
    const handlephonenum = e => {
      console.log("phonechange:",e.target.value)
        setchangephone(e.target.value)
    }
    const[changeemail, setchangeemail] = useState("")
    const handleemail = e => {
      console.log("email:",e.target.value)
        setchangeemail(e.target.value)
    }

    const[cnt,setcnt] = useState(0);
    const[phonenum,setphonenum] = useState(0);
    const[username,setusername] = useState(0);
    
    const[email,setemail] = useState(0);
    const[show_doc_info,setshow_doc_info] = useState(0);
    const[show_doc_name,setshow_doc_name] = useState(0);
    const[doctors,setdoctors] = useState([]);
    const[modalcontent,setmodalcontent] = useState(
        <div><Form.Item
            name="phone"
            rules={[
                {
                    required: true,
                    message: '请输入手机号',
                    trigger: 'blur'
                },
                {
                  pattern:/^1[3456789]\d{9}$/,
                  message:'请输入正确的手机格式'
              }
            ]}
            validateStatus={phoneStyle}
            hasFeedback
            help={phonehelp}
            ><Input placeholder="请输入新的手机号" onChange={handlephonenum}/>
        </Form.Item>
    </div>
    );

    const[modalcontent_email,setmodalcontent_email] = useState(
      <div><Form.Item
          name="email"
          rules={[
              {
                  required: true,
                  message: '请输入邮箱',
                  trigger: 'blur'
              },
              {
                pattern:/^1[3456789]\d{9}$/,
                message:'请输入正确的邮箱格式'
            }
          ]}
          validateStatus={phoneStyle}
          hasFeedback
          help={phonehelp}
          ><Input placeholder="请输入新的邮箱" onChange={handleemail}/>
      </Form.Item>
  </div>
  );

    const [isModalVisible_head, setIsModalVisible_head] = useState(false);
    const sethead = () => {
        setIsModalVisible_head(true);
    }
    const handleOk_head = () => {
        setIsModalVisible_head(false);
    }
    const handleCancel_head = () => {
        setIsModalVisible_head(false);
    }



    const [isModalVisible_phone, setIsModalVisible_phone] = useState(false);
    const [modalstate, setmodalstate] = useState(0);

    const phone_rebind = () => {
        setIsModalVisible_phone(true);
    };

    const handleOk = () => {
      const user_id = cookie.load('user_id')
        if(modalstate == 0){
            setmodalcontent(<div><Input style={{ width: 200, textAlign: 'center' }} placeholder="请输入验证码" /></div>);
            setmodalstate(1);
        }
        else if(modalstate == 1){
            setmodalstate(0);
            setmodalcontent(<div><Form.Item
              name="phone"
              rules={[
                  {
                      required: true,
                      message: '请输入手机号',
                      trigger: 'blur'
                  },
                  {
                    pattern:/^1[3456789]\d{9}$/,
                    message:'请输入正确的手机格式'
                }
              ]}
              validateStatus={phoneStyle}
              hasFeedback
              help={phonehelp}
              ><Input placeholder="请输入新的手机号" onChange={handlephonenum}/>
          </Form.Item>
      </div>)
            userinfo_api.set_phone(user_id,changephone)
            setIsModalVisible_phone(false);
        }
    };

    const handleCancel = () => {
        setIsModalVisible_phone(false);
    };

    /*emmail */
    const [isModalVisible_email, setIsModalVisible_email] = useState(false);
    const [modalstate_email, setmodalstate_email] = useState(0);

    const email_rebind = () => {
        setIsModalVisible_email(true);
    };

    const handleOk_email = () => {
      const user_id = cookie.load('user_id')
        if(modalstate_email == 0){
            setmodalcontent_email(<div><Input style={{ width: 200, textAlign: 'center' }} placeholder="请输入验证码" /></div>);
            setmodalstate_email(1);
        }
        else if(modalstate_email == 1){
            setmodalstate_email(0);
            setmodalcontent_email(<div><Form.Item
              name="email"
              rules={[
                  {
                      required: true,
                      message: '请输入邮箱',
                      trigger: 'blur'
                  },
                  {
                    pattern:/^1[3456789]\d{9}$/,
                    message:'请输入正确的邮箱格式'
                }
              ]}
              validateStatus={phoneStyle}
              hasFeedback
              help={phonehelp}
              ><Input placeholder="请输入新的邮箱" onChange={handleemail}/>
          </Form.Item>
      </div>)
            userinfo_api.set_email(user_id,changeemail)
            setIsModalVisible_email(false);
        }
    };

    const handleCancel_email = () => {
        setIsModalVisible_email(false);
    };
    /* */

    function Setinfo(pn,uname,ag,em,gen,her,pas,h,w){
        setphonenum(pn);
        setusername(uname);
        setage(ag);
        setemail(em);
        setgender(gen);
        sethereditary(her);
        setpastill(pas);
        setheight(h);
        setweight(w);
    }

    function changestate1(){
        setcnt(0);
    }

    function changestate2(){
        setcnt(1);
    }

    /*以下为完善个人信息部分*/
    const [isModalVisible_altinfo, setIsModalVisible_altinfo] = useState(false);
    const [hereditary, sethereditary] = useState("");
    const [pastill, setpastill] = useState("");
    const[age,setage] = useState(0);
    const[height,setheight] = useState(0);
    const[weight,setweight] = useState(0);
    const [form] = Form.useForm();

    const[age_changed,setage_changed] = useState(0);
    const[gender_changed,setgender_changed] = useState(0);
    const[hereditary_changed,sethereditary_changed] = useState(0);
    const[pastill_changed,setpastill_changed] = useState(0);
    const[height_changed,setheight_changed] = useState(0);
    const[weight_changed,setweight_changed] = useState(0);

    const altinfo_visable = () => {
      setIsModalVisible_altinfo(true);
    }
    const handleOk_altinfo = () => {
        if (gender_changed == 0)  message.warning('请选择性别！')
        else if (age_changed == 0) message.warning('请输入年龄！')
        else {
          userinfo_api.set_userinfo(user_id,gender_changed,age_changed,hereditary_changed,pastill_changed,height_changed,weight_changed).then(
              r=>{
                  console.log(r.data)
              }
          )
          setIsModalVisible_altinfo(false);
        }
    }
    const handleCancel_altinfo = () => {
        setIsModalVisible_altinfo(false);
    }
    const handlereset_altinfo =() => {
      form.resetFields();
    }

    //性别
    const [gender, setgender] = useState('');
  
    const changegender = (e) => {
      console.log("性别", e.target.value);
      setgender(e.target.value);
      setgender_changed(e.target.value);
    };

    //年龄
    const changeage = (value) => {
      console.log("年龄",value)
      setage(value);
      setage_changed(value);
    };

    //身高
    const changeheight = (value) => {
      console.log("身高",value)
      setheight(value);
      setheight_changed(value);
    };

    //体重
    const changeweight = (value) => {
      console.log("体重",value)
      setweight(value);
      setweight_changed(value);
    };

    //既往病
    const changepastill = e => {
      console.log("既往病",e.target.value)
      setpastill_changed(e.target.value);
    };

    //遗传病
    const changehere = e => {
      console.log("遗传病",e.target.value)
      sethereditary_changed(e.target.value);
    };


    /*以下为医生部分 */
    const [isModalVisible_doc, setIsModalVisible_doc] = useState(false);
    const setdoc = (item) => {
        setIsModalVisible_doc(true);
        console.log(item)
        setshow_doc_name(item.doctor_name);
        setshow_doc_info(item.intro);
    }
    const handleOk_doc = () => {
        setIsModalVisible_doc(false);
    }
    const handleCancel_doc = () => {
        setIsModalVisible_doc(false);
    }

    function docinfo(){
      if(doctors.length == 0 ) return (<div></div>)
      else
        return(
          <>
            {
                doctors.map(Item=>{
                    return (<div>
                          <Button style={{margin:'20px'}} onClick={()=>setdoc(Item)}>{Item.doctor_name}</Button>
                          
                        </div>)
                })
            }
          </>
        )
    }

    /*********/ 
    const[getcont,setgetcont] = useState(false)

    function Getcontent(){
        
        console.log("token",cookie.load('token'))
        //useEffect(()=>{
        if(getcont == false){
            setgetcont(true)
            userinfo_api.get_userinfo(user_id).then(
                r=>{
                    Setinfo(r.data.data.phone,
                        r.data.data.username, r.data.data.age, r.data.data.email,
                        r.data.data.gender, r.data.data.hereditary, r.data.data.pastill,
                        r.data.data.height, r.data.data.weight
                        );
                    // Setinfo(r.data.data.phone, r.data.data.username, 0, r.data.data.email, r.data.data.gender,
                    //   0, 0, 0, 0)
                }
            )
            userinfo_api.collect_doctor_list(user_id).then(
                r=>{
                  setdoctors(r.data.data)
                  console.log(doctors)
                }
            )
            userinfo_api.get_avatar(user_id).then(
              r=>{setuserAvatar(r.data.data.url)}
            )
        //})
        }
        //if(doctors.length!=0) console.log(doctors[0].doctor_name)

        if(cnt == 1) return (
            <div class = "repodiv">
                <Descriptions title="您的健康报告" bordered column={4}  labelStyle={{width:120}}>
                    <Descriptions.Item label="血压">0</Descriptions.Item>
                    <Descriptions.Item label="身高">0</Descriptions.Item>
                    <Descriptions.Item label="体重">0</Descriptions.Item>
                    <Descriptions.Item label="a指数">0</Descriptions.Item>
                    <Descriptions.Item label="b指数">0</Descriptions.Item>
                    <Descriptions.Item label="c指数">0</Descriptions.Item>
                </Descriptions>
                <br></br>
                <Descriptions title="健康提示" bordered>
                    <Descriptions.Item>
                        1.xx<br></br>
                        2.xx<br></br>
                        3.xx
                    </Descriptions.Item>
                </Descriptions>
            </div>
        )
        else return (
            <div class = "repodiv">
                <Descriptions  bordered={true} size='small' title={''}  column={1} labelStyle={{width:180,height:80}}>
                    <Descriptions.Item label={<div class="labeldiv"><p>头像</p><Button onClick={sethead}>更换</Button></div>}><Avatar size={64} icon={<UserOutlined /> } src={userAvatar}/></Descriptions.Item>
                    <Descriptions.Item label="用户名">{username}</Descriptions.Item>
                    <Descriptions.Item label={<div class="labeldiv"><p>手机号</p><Button onClick={phone_rebind}>换绑</Button></div>}>{phonenum}</Descriptions.Item>
                    <Descriptions.Item label={<div class="labeldiv"><p>邮箱</p><Button onClick={email_rebind}>换绑</Button></div>}>{email}</Descriptions.Item>
                    <Descriptions.Item label="年龄">{age}</Descriptions.Item>
                    <Descriptions.Item label="性别">{gender}</Descriptions.Item>
                    <Descriptions.Item label="身高">{height}</Descriptions.Item>
                    <Descriptions.Item label="体重">{weight}</Descriptions.Item>
                    <Descriptions.Item label="既往病史">{hereditary}</Descriptions.Item>
                    <Descriptions.Item label="家族遗传病史">{pastill}</Descriptions.Item>
                    <Descriptions.Item label="收藏医生">
                      {docinfo()}
                    </Descriptions.Item>
                </Descriptions>
                <Modal title="手机换绑" visible={isModalVisible_phone} onOk={handleOk} onCancel={handleCancel} okText="验证" cancelText="取消" >
                    {modalcontent}
                </Modal>
                <Modal title="邮箱换绑" visible={isModalVisible_email} onOk={handleOk_email} onCancel={handleCancel_email} okText="验证" cancelText="取消" >
                    {modalcontent_email}
                </Modal>
                <Modal title="更换头像" visible={isModalVisible_head} onOk={handleOk_head} onCancel={handleCancel_head} okText="确认" cancelText="取消" >
                    <Setimg/>
                </Modal>
                <Modal title={show_doc_name} visible={isModalVisible_doc} onOk={handleOk_doc} onCancel={handleCancel_doc} okText="确认" cancelText="取消" >
                  {show_doc_info}
                </Modal>
            </div>
        );
    }

    return (
        <div>
            <Menu mode="horizontal" >
                <Menu.Item key="1" onClick={changestate1}>
                用户基本信息
                </Menu.Item>
                <Menu.Item key="2" onClick={changestate2}>
                健康报告
                </Menu.Item>
            </Menu>
            <Button type="primary" className='alter-info-button' onClick={altinfo_visable}>完善个人信息</Button>
            <Modal title="完善信息" visible={isModalVisible_altinfo} onOk={handleOk_altinfo} onCancel={handleCancel_altinfo} okText="确认" cancelText="取消"
            footer={[<Button onClick={handleCancel_altinfo}>取消</Button>,<Button type='primary' onClick={handleOk_altinfo}>提交</Button>]} >
                <div>
                
                <Form form={form}
                      initialValues={{
                          remember: true,
                      }}
                  >
                      <Form.Item name="gender"
                      label="性别"
                            rules={[
                              {
                                required: true,
                              },]}>
                        <text style={{'margin-right':'20px'}}></text>
                      <Radio.Group onChange={changegender} value={gender}>
                          <Radio value={'男'}>男</Radio>
                          <Radio value={'女'}>女</Radio>
                        </Radio.Group>
                      </Form.Item>

                      <Form.Item name="age"
                      label="年龄"
                            rules={[
                              {
                                required: true,
                              },]}>
                        <text style={{'margin-right':'20px'}}></text>
                        <InputNumber min={1} max={100} onChange={changeage} />
                      </Form.Item>
                      
                      <Form.Item name="height"
                      label="身高">
                        <text style={{'margin-right':'20px'}}></text>
                        <InputNumber min={1} max={250} onChange={changeheight} /><text style={{'margin-left':'10px'}}>厘米</text>
                      </Form.Item>
                      
                      <Form.Item name="weight"
                      label="体重">
                        <text style={{'margin-right':'20px'}}></text>
                        <InputNumber min={1} max={200} onChange={changeweight} /><text style={{'margin-left':'10px'}}>千克</text>
                      </Form.Item>

                      <Form.Item
                          rules={[
                          ]}
                      >
                        <text style={{'margin-bottom':'20px'}}>既往病史：</text>
                        <TextArea allowClear showCount maxLength={30}  placeholder="既往病史" onChange={changepastill}/>
                      </Form.Item>

                      <Form.Item
                          rules={[
                          ]}
                      >
                          <text style={{'margin-bottom':'20px'}}>家族遗传病史：</text>
                          <TextArea allowClear showCount maxLength={30} placeholder="家族遗传病史" onChange={changehere}/>
                      </Form.Item>
                    </Form>
                </div>
            </Modal>
            <div class="content">
                <div>{Getcontent()}</div>
            </div>
        </div>

    );
}

export default Userinfo;
