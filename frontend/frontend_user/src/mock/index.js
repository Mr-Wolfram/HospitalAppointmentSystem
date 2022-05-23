import Mock from 'mockjs'

import file from './file'
import role from './role'
import design from './design'
import order from "./order";
import login from './login'
import indexpage from './indexpage'
import querydepartment from './querydepartment'
import registerorder from "./registerorder";
const mocks = [
  ...file,
  ...role,
  ...design,
  ...order,
  ...indexpage,
  ...login,
  ...querydepartment,
  ...registerorder
]

for (const i of mocks) {
  Mock.mock(new RegExp(i.url), i.type, i.response)
}
