import Mock from 'mockjs'

import file from './file'
import role from './role'
import design from './design'

const mocks = [
  ...file,
  ...role,
  ...design
]

for (const i of mocks) {
  Mock.mock(new RegExp(i.url), i.type, i.response)
}
