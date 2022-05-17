interface menuProp {
  key: string
  title: string
  pathname?: string,
  isMenu: boolean,
  icon?: string,
  children?: menuProp[]
}

const menus: menuProp[] = [
  {
    key: '1',
    title: '首页',
    pathname: '/home',
    icon: 'HomeOutlined',
    isMenu: true,
  }, {
    key: '2',
    title: '用户管理',
    isMenu: true,
    icon: 'TeamOutlined',
    children: [
      {
        key: '2-1',
        title: '用户',
        pathname: '/user',
        icon: 'UserAddOutlined',
        isMenu: true,
      }
    ]
  }, {
    key: '3',
    title: '商品管理',
    isMenu: true,
    icon: 'AppstoreOutlined',
    children: [
      {
        key: '3-1',
        title: '商品列表',
        pathname: '/goods',
        icon: 'AppstoreOutlined',
        isMenu: true,
      },
      {
        key: '3-2',
        title: '详情',
        pathname: '/detail',
        icon: 'AppstoreOutlined',
        isMenu: true,
      }
    ]
  }, {
    key: '5',
    title: 'Demo',
    isMenu: true,
    icon: 'UnorderedListOutlined',
    children: [
      {
        key: '5-1',
        title: 'table表格',
        pathname: '/table',
        icon: 'InsertRowAboveOutlined',
        isMenu: true,
      },
      {
        key: '5-2',
        title: '文件上传',
        pathname: '/upload',
        icon: 'ArrowUpOutlined',
        isMenu: true,
      },
      {
        key: '5-3',
        title: 'Tree树形组件',
        pathname: '/tree',
        icon: 'BranchesOutlined',
        isMenu: true,
      },
      {
        key: '5-4',
        title: 'checkBox多选',
        pathname: '/checkBox',
        icon: 'CheckSquareOutlined',
        isMenu: true,
      }
    ]
  }, {
    key: '7',
    title: '流程管理',
    isMenu: true,
    icon: 'AppstoreOutlined',
    children: [
      {
        key: '7-1',
        title: '流程设计',
        pathname: '/process/design',
        icon: 'AppstoreOutlined',
        isMenu: true,
      }
    ]
  }, {
    key: '6',
    title: 'Nest',
    isMenu: true,
    icon: 'UnorderedListOutlined',
    children: [
      {
        key: '6-1',
        title: '嵌套路由',
        pathname: '/nest',
        icon: 'InsertRowAboveOutlined',
        isMenu: true,
        children: [
          {
            key: '6-1-1',
            title: '嵌套路由1-1',
            pathname: '/nest/1',
            icon: 'InsertRowAboveOutlined',
            isMenu: true,
          }
        ]
      },
      {
        key: '6-2',
        title: '嵌套路由2',
        pathname: '/nest/2',
        icon: 'InsertRowAboveOutlined',
        isMenu: true,
      }
    ]
  },  {
    key: '8',
    title: '404',
    pathname: '/404',
    icon: 'ExclamationCircleOutlined',
    isMenu: true,
  }
]

export default menus