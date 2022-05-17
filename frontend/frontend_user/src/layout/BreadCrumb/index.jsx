import React, {useState, useEffect} from 'react'
import { Breadcrumb } from 'antd'

import { getFathersById } from '@/commons/utils'
import menus from '../side/menus'

const Bread = (props) => {
  const [breadList, setBreadList] = useState([])
  const pathname = props.route.location ? props.route.location.pathname : '/home'

  const getSelectedKeys = () => {
    let openKey = []
    openKey = getFathersById(menus, pathname, 'pathname', 'title')
    setBreadList(openKey)
    // console.log(openKey)
  }

  useEffect(() => {
    getSelectedKeys()
  }, [pathname])
  return (
    <Breadcrumb className='breadcontent'>
      {breadList.map((item) => {
        return <Breadcrumb.Item key={item}>{item}</Breadcrumb.Item>
      })}
    </Breadcrumb>
  )
}

export default Bread