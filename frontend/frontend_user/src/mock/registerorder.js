export default [
  {
    url: '/doctor/info',
    type: 'post',
    response: config => {
      //config.body还是一个字符串,要parse
      let params = JSON.parse(config.body).params;
      console.log("后端收到参数", config.body, params.date)
      const doctorData = [
        {departmentId: '06', doctorId: '0041', name: '吴朝晖', department: '骨科' , major: '跌打损伤', info: '从医20余年, 经验丰富'},
        {departmentId: '06', doctorId: '0001', name: '竺可桢', department: '骨科' , major: '骨质疏松', info: '从医30余年, 主任医师'},
        {departmentId: '06', doctorId: '0022', name: '林建华', department: '骨科' , major: '各类骨折', info: '浙江大学校医院院长'},
        {departmentId: '04', doctorId: '0042', name: '张华', department: '耳鼻喉科' , major: '中耳炎', info: '北京大学医学院博士毕业'},
        {departmentId: '04', doctorId: '0211', name: '赵云', department: '耳鼻喉科' , major: '过敏性鼻炎', info: '从医30余年, 拥有丰富鼻炎治疗经验'},
        {departmentId: '01', doctorId: '0448', name: '李明', department: '眼科' , major: '青光眼', info: '浙江医科大学博士毕业'},
        {departmentId: '01', doctorId: '0129', name: '王刚', department: '眼科' , major: '白内障', info: '浙江大学校医院副院长'},
      ]
      const treeData = [
        {
          title: '骨科',
          value: '06',
          children: [
            {
              title: '吴朝晖',
              value: '0041',
            },
            {
              title: '竺可桢',
              value: '0001',
            },
            {
              title: '林建华',
              value: '0022',
            },
          ],
        },
        {
          title: '耳鼻喉科',
          value: '04',
          children: [
            {
              title: '张华',
              value: '0042',
            },
            {
              title: '赵云',
              value: '0211',
            },
          ],
        },
        {
          title: '眼科',
          value: '01',
          children: [
            {
              title: '李明',
              value: '0448',
            },
            {
              title: '王刚',
              value: '0129',
            },
          ],
        },
      ];
      // using date to determine which doctors info to send
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
    url: '/doctor/select',
    type: 'post',
    response: config => {
      //config.body还是一个字符串,要parse
      let params = JSON.parse(config.body).params;
      console.log("后端收到参数", config.body, params.doctorId)
      return {
        code: 200,
        data: {
          doctor_name: '吴朝晖',
          department: '骨科',
        }
      }
    }
  },
]
