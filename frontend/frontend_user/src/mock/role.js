// import Mock from 'mockjs'

// const Random = Mock.Random

export default [
  {
    url: '/getList/dept',
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
        data: [...gData]
      }
    }
  }
]