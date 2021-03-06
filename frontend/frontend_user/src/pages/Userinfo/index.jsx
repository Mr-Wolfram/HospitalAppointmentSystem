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

      const [userAvatar, setuserAvatar] = useState(
          ""
          // "https://joeschmoe.io/api/v1/random"
      );

      const Setimg = () => {
        const [loading, setLoading] = useState(false);
        const [imageUrl, setImageUrl] = useState();

        const handleChange = (info) => {
          if (info.file.status === 'uploading') {
          //   setLoading(true);
          //   return;
          // }

          // if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, (url) => {
              setLoading(false);
              setImageUrl(url);
              setuserAvatar(url)
              console.log(url)
              userinfo_api.set_avatar(cookie.load('user_id'),1)
              message.success('?????????????????????')
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
        let a = "http://localhost:3000/api/user/info/setavatar?user_id="+cookie.load('user_id')

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

    /***?????????????????????***/

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
                    message: '??????????????????',
                    trigger: 'blur'
                },
                {
                  pattern:/^1[3456789]\d{9}$/,
                  message:'??????????????????????????????'
              }
            ]}
            validateStatus={phoneStyle}
            hasFeedback
            help={phonehelp}
            ><Input placeholder="????????????????????????" onChange={handlephonenum}/>
        </Form.Item>
    </div>
    );

    const[modalcontent_email,setmodalcontent_email] = useState(
      <div><Form initialValues={{
        remember: true,
    }}><Form.Item
          name="email"
          rules={[
              {
                  required: true,
                  message: '???????????????',
                  trigger: 'blur'
              },
              {
                pattern:/^1[3456789]\d{9}$/,
                message:'??????????????????????????????',
                trigger: 'blur'
            }
          ]}
          validateStatus={phoneStyle}
          hasFeedback
          help={phonehelp}
          ><Input placeholder="?????????????????????" onChange={handleemail}/>
      </Form.Item></Form>
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
    const [idcode,setidcode] = useState('')

    const handleidcode = e => {
      setidcode(e.target.value)
    }

    const phone_rebind = () => {
        setIsModalVisible_phone(true);
    };

    const handleOk = () => {
      const user_id = cookie.load('user_id')
        if(modalstate == 0){
          const reg = /^1[3456789]\d{9}$/
          if (!reg.test(changephone)) {
              message.warning('?????????????????????????????????')
          }else{
            setmodalcontent(
              <div><Input style={{ width: 200, textAlign: 'center' }} placeholder="??????????????????" onChange={handleidcode} />
              <Button onClick={()=>{message.success("????????????123456",4)}}>???????????????</Button></div>
            );
            setmodalstate(1);
          }
        }
        else if(modalstate == 1){
          if(idcode == '123456') {
            setidcode('0')
            setmodalstate(0);
            setmodalcontent(<div><Form.Item
              name="phone"
              validateStatus={phoneStyle}
              hasFeedback
              help={phonehelp}
              ><Input placeholder="????????????????????????" onChange={handlephonenum}/>
          </Form.Item>
      </div>)
            userinfo_api.set_phone(user_id,changephone)
            message.success('????????????????????????')
            setIsModalVisible_phone(false);
        }else{
          message.warning('??????????????????',2)
        }
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
          if(modalstate == 0){
            const reg = /^[A-Za-z0-9-._]+@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,6})$/
            if (!reg.test(changeemail)) {
                message.warning('??????????????????????????????')
            }else{
              setmodalcontent_email(
                <div><Input style={{ width: 200, textAlign: 'center' }} placeholder="??????????????????" onChange={handleidcode} />
                <Button onClick={()=>{message.success("????????????123456",4)}}>???????????????</Button></div>
              );
              setmodalstate_email(1);
            }}
        }
        else if(modalstate_email == 1){
            if(idcode == '123456') {
              setidcode('0')
            setmodalstate_email(0);
            setmodalcontent_email(<div><Form.Item
              name="email"
              validateStatus={phoneStyle}
              hasFeedback
              help={phonehelp}
              ><Input placeholder="?????????????????????" onChange={handleemail}/>
          </Form.Item>
      </div>)
            userinfo_api.set_email(user_id,changeemail)
            message.success('?????????????????????')
            setIsModalVisible_email(false);
        }else{
          message.warning('??????????????????',2)
        }
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

    /*?????????????????????????????????*/
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
        if (gender_changed == 0)  message.warning('??????????????????')
        else if (age_changed == 0) message.warning('??????????????????')
        else {
          message.success('???????????????????????????')
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

    //??????
    const [gender, setgender] = useState('');

    const changegender = (e) => {
      console.log("??????", e.target.value);
      setgender(e.target.value);
      setgender_changed(e.target.value);
    };

    //??????
    const changeage = (value) => {
      console.log("??????",value)
      setage(value);
      setage_changed(value);
    };

    //??????
    const changeheight = (value) => {
      console.log("??????",value)
      setheight(value);
      setheight_changed(value);
    };

    //??????
    const changeweight = (value) => {
      console.log("??????",value)
      setweight(value);
      setweight_changed(value);
    };

    //?????????
    const changepastill = e => {
      console.log("?????????",e.target.value)
      setpastill_changed(e.target.value);
    };

    //?????????
    const changehere = e => {
      console.log("?????????",e.target.value)
      sethereditary_changed(e.target.value);
    };

    /*??????????????????????????? */
    const[general,setgeneral] = useState(0)
    const[bloodoxygen,setbloodoxygen] = useState(0)
    const[sleep,setsleep] = useState(0)
    const[heartrate,setheartrate] = useState(0)
    const[generalchange,setgeneralchange] = useState(0)
    const[bloodoxygenchange,setbloodoxygenchange] = useState(0)
    const[sleepchange,setsleepchange] = useState(0)
    const[heartratechange,setheartratechange] = useState(0)
    const [isModalVisible_healthinfo, setIsModalVisible_healthinfo] = useState(false);

    const healthinfo_visable=()=>{
      setIsModalVisible_healthinfo(true);
    }
    const handleOk_healthinfo = () => {
      if (generalchange == 0 || bloodoxygenchange == 0 || sleepchange == 0 || heartratechange == 0)
      message.warning('????????????????????????')
      else {
        message.success('???????????????????????????')
        userinfo_api.set_healthinfo(user_id,generalchange,bloodoxygenchange,sleepchange,heartratechange).then(
            r=>{
                console.log(r.data)
            }
        )
        setIsModalVisible_healthinfo(false);
      }
    }
    const handleCancel_healthinfo = () => {
        setIsModalVisible_healthinfo(false);
    }

    const changegeneral = (value) => {
      console.log("??????",value)
      setgeneralchange(value);
    };
    const changebloodoxygen = (value) => {
      console.log("??????",value)
      setbloodoxygenchange(value);
    };
    const changesleep = (value) => {
      console.log("??????",value)
      setsleepchange(value);
    };
    const changeheartrate = (value) => {
      console.log("??????",value)
      setheartratechange(value);
    };

    function sethealth(genr,bloxy,sle,hearate){
      setgeneral(genr)
      setbloodoxygen(bloxy)
      setsleep(sle)
      setheartrate(hearate)
    }


    /*????????????????????? */
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
                    return (
                          <Button style={{margin:'20px'}} onClick={()=>setdoc(Item)}>{Item.doctor_name}</Button>

                        )
                })
            }
          </>
        )
    }

    /*********/
    const[getcont,setgetcont] = useState(false)

    function Getcontent(){

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
            userinfo_api.get_healthinfo(user_id).then(
              r=>{
                sethealth(r.data.data.health.total.value, r.data.data.health.pulse_oximeter.value,
                  r.data.data.health.sleep_quality.value, r.data.data.health.heart_rate.value)
              }
            )
        }

        if(cnt == 1) return (
            <div class = "repodiv">
                <Descriptions title="??????????????????" bordered column={4}  labelStyle={{width:120}}>
                    <Descriptions.Item label="??????">0</Descriptions.Item>
                    <Descriptions.Item label="??????">0</Descriptions.Item>
                    <Descriptions.Item label="??????">0</Descriptions.Item>
                    <Descriptions.Item label="a??????">0</Descriptions.Item>
                    <Descriptions.Item label="b??????">0</Descriptions.Item>
                    <Descriptions.Item label="c??????">0</Descriptions.Item>
                </Descriptions>
                <br></br>
                <Descriptions title="????????????" bordered>
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
                <Button type="primary" className='alter-info-button' onClick={altinfo_visable}>??????????????????</Button>
                <Button type="primary" className='alter-info-button' onClick={healthinfo_visable}>??????????????????</Button>
                <Descriptions contentStyle={{backgroundColor:'#FCFCFC',borderColor:'#9D9D9D',border:'1px solid'}}
                labelStyle={{width:180,height:80,backgroundColor:'#DEDEDE',borderColor:'#9D9D9D',border:'1px solid'}} bordered={true} size='small' title={''}  column={2} >
                    <Descriptions.Item label={<div class="labeldiv"><p>??????</p><Button onClick={sethead}>??????</Button></div>}><Avatar size={64} icon={<UserOutlined /> } src={userAvatar}/></Descriptions.Item>
                    <Descriptions.Item label="?????????">{username}</Descriptions.Item>
                    <Descriptions.Item label={<div class="labeldiv"><p>?????????</p><Button onClick={phone_rebind}>??????</Button></div>}>{phonenum}</Descriptions.Item>
                    <Descriptions.Item label={<div class="labeldiv"><p>??????</p><Button onClick={email_rebind}>??????</Button></div>}>{email}</Descriptions.Item>
                    <Descriptions.Item label="??????">{age}</Descriptions.Item>
                    <Descriptions.Item label="??????">{gender}</Descriptions.Item>
                    <Descriptions.Item label="?????????cm???">{height}</Descriptions.Item>
                    <Descriptions.Item label="?????????kg???">{weight}</Descriptions.Item>
                    <Descriptions.Item label="????????????">{hereditary}</Descriptions.Item>
                    <Descriptions.Item label="??????????????????">{pastill}</Descriptions.Item>
                    <Descriptions.Item label="????????????" span={2}>
                      {docinfo()}
                    </Descriptions.Item>
                    <Descriptions.Item label="??????????????????">{general}</Descriptions.Item>
                    <Descriptions.Item label="????????????">{bloodoxygen}</Descriptions.Item>
                    <Descriptions.Item label="????????????">{sleep}</Descriptions.Item>
                    <Descriptions.Item label="??????">{heartrate}</Descriptions.Item>
                </Descriptions>
                <Modal title="????????????" visible={isModalVisible_phone} onOk={handleOk} onCancel={handleCancel} okText="??????" cancelText="??????" >
                    {modalcontent}
                </Modal>
                <Modal title="????????????" visible={isModalVisible_email} onOk={handleOk_email} onCancel={handleCancel_email} okText="??????" cancelText="??????" >
                    {modalcontent_email}
                </Modal>
                <Modal title="????????????" visible={isModalVisible_head} onOk={handleOk_head} onCancel={handleCancel_head} okText="??????" cancelText="??????" >
                    <Setimg/>
                </Modal>
                <Modal title={show_doc_name} visible={isModalVisible_doc} onOk={handleOk_doc} onCancel={handleCancel_doc} okText="??????" cancelText="??????" >
                  {show_doc_info}
                </Modal>
            </div>
        );
    }

    return (
        <div>
            <Menu mode="horizontal" bordered >
                <Menu.Item key="1" onClick={changestate1}>
                ??????????????????
                </Menu.Item>
                {/* <Menu.Item key="2" onClick={changestate2}>
                ????????????
                </Menu.Item> */}
            </Menu>

            <Modal title="????????????" visible={isModalVisible_altinfo} onOk={handleOk_altinfo} onCancel={handleCancel_altinfo} okText="??????" cancelText="??????"
            footer={[<Button onClick={handleCancel_altinfo}>??????</Button>,<Button type='primary' onClick={handleOk_altinfo}>??????</Button>]} >
                <div>

                <Form form={form}
                      initialValues={{
                          remember: true,
                      }}
                  >
                      <Form.Item name="gender"
                      label="??????"
                            rules={[
                              {
                                required: true,
                              },]}>
                        <text style={{'margin-right':'20px'}}></text>
                      <Radio.Group onChange={changegender} value={gender}>
                          <Radio value={'???'}>???</Radio>
                          <Radio value={'???'}>???</Radio>
                        </Radio.Group>
                      </Form.Item>

                      <Form.Item name="age"
                      label="??????"
                            rules={[
                              {
                                required: true,
                              },]}>
                        <text style={{'margin-right':'20px'}}></text>
                        <InputNumber min={1} max={100} onChange={changeage} />
                      </Form.Item>

                      <Form.Item name="height"
                      label="??????">
                        <text style={{'margin-right':'20px'}}></text>
                        <InputNumber min={1} max={250} onChange={changeheight} /><text style={{'margin-left':'10px'}}>cm</text>
                      </Form.Item>

                      <Form.Item name="weight"
                      label="??????">
                        <text style={{'margin-right':'20px'}}></text>
                        <InputNumber min={1} max={200} onChange={changeweight} /><text style={{'margin-left':'10px'}}>kg</text>
                      </Form.Item>

                      <Form.Item
                          rules={[
                          ]}
                      >
                        <text style={{'margin-bottom':'20px'}}>???????????????</text>
                        <TextArea allowClear showCount maxLength={30}  placeholder="????????????" onChange={changepastill}/>
                      </Form.Item>

                      <Form.Item
                          rules={[
                          ]}
                      >
                          <text style={{'margin-bottom':'20px'}}>?????????????????????</text>
                          <TextArea allowClear showCount maxLength={30} placeholder="??????????????????" onChange={changehere}/>
                      </Form.Item>
                    </Form>
                </div>
            </Modal>

            <Modal title="??????????????????" visible={isModalVisible_healthinfo} onOk={handleOk_healthinfo} onCancel={handleCancel_healthinfo} okText="??????" cancelText="??????"
            footer={[<Button onClick={handleCancel_healthinfo}>??????</Button>,<Button type='primary' onClick={handleOk_healthinfo}>??????</Button>]} >
                <div>

                <Form form={form}
                      initialValues={{
                          remember: true,
                      }}
                  >
                      <Form.Item name="general"
                      label="??????" rules={[{required: true,},]}>
                        <text style={{'margin-right':'20px'}}></text>
                        <InputNumber min={1} max={100} step="0.01" precision={2} onChange={changegeneral} />
                      </Form.Item>

                      <Form.Item name="bloodoxygen"
                      label="??????" rules={[{required: true,},]}>
                        <text style={{'margin-right':'20px'}}></text>
                        <InputNumber min={1} max={100} step="0.01" precision={2} onChange={changebloodoxygen} />
                        <text style={{'margin-left':'10px'}}>%</text>
                      </Form.Item>

                      <Form.Item name="sleep"
                      label="??????" rules={[{required: true,},]}>
                        <text style={{'margin-right':'20px'}}></text>
                        <InputNumber min={1} max={24} step="0.01" precision={2} onChange={changesleep} />
                        <text style={{'margin-left':'10px'}}>??????/???</text>
                      </Form.Item>

                      <Form.Item name="heartrate"
                      label="??????" rules={[{required: true,},]}>
                        <text style={{'margin-right':'20px'}}></text>
                        <InputNumber min={1} max={200} step="0.01" precision={2} onChange={changeheartrate} />
                        <text style={{'margin-left':'10px'}}>???/??????</text>
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
