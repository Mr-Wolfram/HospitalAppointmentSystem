import Mock from 'mockjs'

const Random = Mock.Random

let userList = []
for (let i = 0; i < 16; i++) {
  let file = {}
  file.id = i + 1
  file.name = Random.title(1)
  userList.push(file)
}

export default [
  {
    url: '/getAll/dept',
    type: 'get',
    response: () => {

      const x = 3;
      const y = 2;
      const z = 1;
      const gData = [];
      
      const generateData = (_level, _preKey, _tns) => {
        const preKey = _preKey || '0';
        const tns = _tns || gData;
      
        const children = [];
        for (let i = 0; i < x; i++) {
          const key = `${preKey}-${i}`;
          tns.push({ title: key, key });
          if (i < y) {
            children.push(key);
          }
        }
        if (_level < 0) {
          return tns;
        }
        const level = _level - 1;
        children.forEach((key, index) => {
          tns[index].children = [];
          return generateData(level, key, tns[index].children);
        });
      };
      generateData(z)
      return {
        code: 200,
        data: {
          deptList: [...gData]
        }
      }
    }
  },
  {
    url: '/getAll/list',
    type: 'get',
    response: () => {

      return {
        code: 200,
        data: {
          userList
        }
      }
    }
  },
  {
    url: '/getAll/role/list',
    type: 'get',
    response: () => {

      let fileList = []
      for (let i = 0; i < 16; i++) {
        let file = {}
        file.id = Random.id()
        file.name = Random.title(1)
        fileList.push(file)
      }
      return {
        code: 200,
        data: fileList
      }
    }
  },
  {
    url: '/get/user/id',
    type: 'post',
    response: (config) => {

      const id = config.body

      const userInfo = userList.filter(item => {
        return item.id === id
      })

      return {
        code: 200,
        data: userInfo[0]
      }
    }
  },
  {
    url: '/deploy/BpmnBy/String',
    type: 'get',
    response: () => {

      let fileList = []
      for (let i = 0; i < 6; i++) {
        let file = {}
        file.id = Random.id()
        file.name = Random.title(3, 5)
        file.url = Random.image('200x100', '#50B347', '#FFF', Random.title(1))
        fileList.push(file)
      }
      return {
        code: 200,
        data: fileList
      }
    }
  }
]