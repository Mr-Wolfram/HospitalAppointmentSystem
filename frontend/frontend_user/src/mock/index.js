import Mock from 'mockjs'

import file from './file'
import role from './role'
import design from './design'
import order from "./order";

const mocks = [
  ...file,
  ...role,
  ...design,
  ...order
]

for (const i of mocks) {
  Mock.mock(new RegExp(i.url), i.type, i.response)
}
