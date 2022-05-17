import React, {useState} from 'react'
import { Layout, Menu, Dropdown, Avatar, Tag } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined ,
} from '@ant-design/icons'
import {Route, Switch, Link} from 'react-router-dom';
import NotFound from '@/pages/404';
import pageRoutes from '@/pages/page-routes'
import {toLogin} from '@/commons/index'

import SiderMenu from '../side/index';
import './style.less'
import Bread from '../BreadCrumb'
import menus from '@/layout/side/menus'

const { Header, Sider, Content } = Layout;

function Template(props: any) {
  
  const getCurrent = (path: string) => {
    let currentTab: any[] = []

    // 获取匹配的key
    const render = (data: any[]) => {
      data.some((item: any) => {
        if (item.pathname === path && path !== '/home') {
          currentTab.push(item)
          return true
        } else if (item.children && item.children.length) {
          render(item.children)
        }
      })
    }
    render(menus)
    return currentTab
  }
  const pathname = props.location ? props.location.pathname : '/home'
  const [collapsed, setCollapased] = useState<boolean>(false)
  const [selectedKeys, setSelectedKeys] = useState<any[]>([])
  const [tagMenus, setTagMenus] = useState<any[]>(getCurrent(pathname))

  const toggle = () => {
    setCollapased((pre) => {
      return !pre
    })
  }

  const logout = () => {
    sessionStorage.removeItem('login')
    toLogin()
  }

  const setTabl = (tab: any) => {
    const menus: any[] = [...tagMenus]
    let flag = true
    menus.some((item) => {
      if (item.key === tab.key) {
        flag = false
      }
    })
    if (flag && tab.key !== '1') {
      menus.push(tab)
    }
    setTagMenus(menus)
    props.history.push(tab.pathname)
    // console.log(77, tab)
  }

  const handleSelected = (item: any) => {
    const keys = [item.key]
    setSelectedKeys(keys)
    // console.log(77, keys, selectedKeys, item)
  }
  const closeTag = (item: any) => {
    // console.log(9, tagMenus)
    const index = tagMenus.findIndex((row: any) => row.key === item.key)
    let tab = {
      pathname: '/home',
      key: '1'
    }
    tagMenus.splice(index, 1)
    if (tagMenus[index]) {
      tab = tagMenus[index]
    } else if (tagMenus[index - 1]) {
      tab = tagMenus[index - 1]
    }
    setSelectedKeys([tab.key])
    props.history.push(tab.pathname)
  }

  const drownMenu = (
    <Menu>
      <Menu.Item>
        <a onClick={logout}>
          退出登录
        </a>
      </Menu.Item>
    </Menu>
  )

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />{selectedKeys}
        <SiderMenu route={props} selectedKey={selectedKeys} onTab={(tab: any)=> setTabl(tab)} ></SiderMenu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background site-layout-header" style={{ padding: 0 }}>
          <div className="left-content">
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: toggle,
            })}
            <Bread route={props} />
          </div>
          <div className="right-conent">
            <span style={{paddingRight: '10px'}}>
              <Avatar size="large" icon={<UserOutlined />} />
            </span>
            <Dropdown overlay={drownMenu} placement="bottomRight">
              <a>潇洒小姐</a>
            </Dropdown>
          </div>
        </Header>
        <div className="tab-view">
          <Tag color={pathname === '/home' || pathname === '/' ? "blue" : ''} onClick={() => handleSelected({pathname: '/home', key: '1'})}>
            <Link to={{pathname: '/home'}}>首页</Link>
          </Tag>
          {
            tagMenus && tagMenus.length ? tagMenus.map((item: any) => {
              return <Tag key={item.key} color={item.pathname === pathname ? "blue" : ''} closable onClick={() => handleSelected(item)} onClose={() => closeTag(item)}>
                <Link to={{pathname: item.pathname}}>{item.title}</Link>
              </Tag>
            }) : null
          }
        </div>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          <Switch>
            {pageRoutes.map(item => {
                const { path, component } = item
                return ( 
                  <Route key={path} exact path={path} component={component}/>
                )
              })}
              <Route component={NotFound} />
          </Switch>
        </Content>
      </Layout>
    </Layout>
  )
}


export default Template
