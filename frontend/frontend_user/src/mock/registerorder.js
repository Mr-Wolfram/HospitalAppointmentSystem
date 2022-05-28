import img2 from '../pages/user/Registration/images/2.png'
export default [
  {
    url: '/api/user/registration/info',
    type: 'post',
    response: config => {
      //config.body还是一个字符串,要parse
      let params = JSON.parse(config.body).params;
      console.log("后端收到参数", config.body, params.date)
      const doctorData = [
        {departmentId: '06', doctorId: 'd0041', name: '吴朝晖', department: '骨科' , major: '跌打损伤', info: '从医20余年, 经验丰富'},
        {departmentId: '06', doctorId: 'd0001', name: '竺可桢', department: '骨科' , major: '骨质疏松', info: '从医30余年, 主任医师'},
        {departmentId: '06', doctorId: 'd0022', name: '林建华', department: '骨科' , major: '各类骨折', info: '浙江大学校医院院长'},
        {departmentId: '04', doctorId: 'd0042', name: '张华', department: '耳鼻喉科' , major: '中耳炎', info: '北京大学医学院博士毕业'},
        {departmentId: '04', doctorId: 'd0211', name: '赵云', department: '耳鼻喉科' , major: '过敏性鼻炎', info: '从医30余年, 拥有丰富鼻炎治疗经验'},
        {departmentId: '01', doctorId: 'd0448', name: '李明', department: '眼科' , major: '青光眼', info: '浙江医科大学博士毕业'},
        {departmentId: '01', doctorId: 'd0129', name: '王刚', department: '眼科' , major: '白内障', info: '浙江大学校医院副院长'},
      ]
      const treeData = [
        {
          title: '骨科',
          value: '06',
          children: [
            {
              title: '吴朝晖',
              value: 'd0041',
            },
            {
              title: '竺可桢',
              value: 'd0001',
            },
            {
              title: '林建华',
              value: 'd0022',
            },
          ],
        },
        {
          title: '耳鼻喉科',
          value: '04',
          children: [
            {
              title: '张华',
              value: 'd0042',
            },
            {
              title: '赵云',
              value: 'd0211',
            },
          ],
        },
        {
          title: '眼科',
          value: '01',
          children: [
            {
              title: '李明',
              value: 'd0448',
            },
            {
              title: '王刚',
              value: 'd0129',
            },
          ],
        },
      ];
      // 根据日期返回当日值班医生信息
      return {
        code: 200,
        data: {
          doctorData: doctorData,
          treeData: treeData,
        }
      }
    }
  },

  {
    url: '/api/user/registration/select',
    type: 'post',
    response: config => {
      //config.body还是一个字符串,要parse
      let params = JSON.parse(config.body).params;
      console.log("后端收到参数", config.body, params.doctorId)
      const numberOfQueue = [3, 0, 1, 0, 6, 2, 0, 2]
      // 根据医生信息返回排队人数
      return {
        code: 200,
        data: {
          numberOfQueue: numberOfQueue,
        }
      }
    }
  },

  {
    url: '/api/user/registration/form',
    type: 'post',
    response: config => {
      //config.body还是一个字符串,要parse
      let params = JSON.parse(config.body).params;
      console.log("后端收到参数", config.body, params.userId, params.doctorId, params.time)
      const QRcodeUrl = img2;
      // 判断当前医生时间段的排队人数是否还未满
      return {
        code: 200,
        data: {
          submitSuccess: true,
          QRcodeUrl: QRcodeUrl,
          orderId: 'o1122334455',
        }
      }
    }
  },

  {
    url: '/api/user/registration/pay',
    type: 'post',
    response: config => {
      //config.body还是一个字符串,要parse
      let params = JSON.parse(config.body).params;
      console.log("后端收到参数", config.body, params.orderId)
      // 判断支付是否成功
      return {
        code: 200,
        data: {
          paySuccess: true,
        }
      }
    }
  },

  {
    url: '\/api\/user\/order\/revoke/\*',
    type: 'post',

    response: config => {
        return {
          code:200,
          data:{
            IsSuccess:false,//有效订单在未就诊完成的时候可以撤回
            remarks:"TRADE_FINISHED"//订单的状态有:"WAIT_BUYER_PAY","TRADE_CLOSED","TRADE_SUCCESS","TRADE_FINISHED",其中"WAIT_BUYER_PAY"和"TRADE_SUCCESS"时可以撤销的
          }
        }
    }
  },
  {
    url: '\/api\/user\/order\/create/\*',
    type: 'post',

    response: config => {
      return {
        code:200,
        data:{
          "code":200,
          "data":{
            "is_create":1
          }
        }
      }
    }
  },
]
