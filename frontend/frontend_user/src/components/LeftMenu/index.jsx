import {React} from "react";
import { Menu, Layout } from 'antd';
import {
    UserOutlined,
    HomeOutlined,
} from '@ant-design/icons';
import {Link} from "react-router-dom";

const { Sider } = Layout;
const { SubMenu } = Menu;

const LeftMenu = (props) => {
    const changePage = props.changePag;
    return (

        <Sider width={200} className="site-layout-background" >

            <Menu
                mode="inline"
                // mode="horizontal"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub2']}
                style={{ height: '100%', borderRight: 0 }}
                theme={'dark'}

            >
                <Menu.Item key="1" icon={<HomeOutlined />} onClick={e => changePage("首页")}><Link to={{pathname:'/index'}}>首页</Link></Menu.Item>

                <SubMenu key="sub1" icon={<UserOutlined />} title="用户中心">
                    <Menu.Item key="5" onClick={e => changePage("个人信息")}><Link to={{pathname:'/index/userinfo'}}>个人信息</Link></Menu.Item>
                    <Menu.Item key="3" onClick={e => changePage("修改密码")}><Link to={{pathname:'/index/alterPwd'}}>修改密码</Link></Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" icon={<UserOutlined />} title="预约管理" >
                    <Menu.Item key="2" onClick={e => changePage("科室浏览")}><Link to={{pathname:'/index/department'}}>科室浏览</Link></Menu.Item>
                    <Menu.Item key="6"  onClick={e => changePage("挂号预约")}><Link to={{pathname:'/index/registration'}}>挂号预约</Link></Menu.Item>
                    <Menu.Item key="8" onClick={e => changePage("订单管理")}><Link to={{pathname:'/index/ordermanage'}}>订单管理</Link></Menu.Item>
                    <Menu.Item key="4" onClick={e => changePage("系统通知")}><Link to={{pathname:'/index/notice'}}>系统通知</Link></Menu.Item>
                </SubMenu>

                {/*<Menu.Item key="5" icon={<FileSearchOutlined />} onClick={e => changePage("其他")}><Link to={{pathname:'/index/'}}>其他</Link></Menu.Item>*/}
            </Menu>
        </Sider>

    );
};
export default LeftMenu;
