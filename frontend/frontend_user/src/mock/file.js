import Mock from 'mockjs'
import qs from "qs"
const Random = Mock.Random

export default [
  {
    url: '/upload/file',
    type: 'post',
    response: config => {
      //config.body还是一个字符串,要parse
      let params=JSON.parse(config.body).params;
      console.log("后端收到参数",config.body,params.file_url,params.file_name)
      return {
        code: 200,
        data: {
          name: 'file',
          url: Random.image('200x100', '#50B347', '#FFF', 'Mfile')
        }
      }
    }
  },
  {
    url: '/getList/file',
    type: 'get',
    response: (config) => {
      console.log("aaa",config);
      let fileList = []
      for (let i = 0; i < 6; i++) {
        let file = {}
        file.uid = Random.id()
        file.name = Random.title(3, 5)
        file.url = Random.image('200x100', '#50B347', '#FFF', Random.title(1))
        fileList.push(file)
      }
      return {
        code: 200,
        data: {
          fileList
        }
      }
    }
  }
]
