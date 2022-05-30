import React from 'react';
import { Typography, Divider} from 'antd';
import { render } from 'react-dom';
import { Statistic, Card,Row, Col } from 'antd';
import { Image } from 'antd';
import '../news.css'
import img1 from './img/1.jpeg'
import img2 from './img/2.jpeg'
import img3 from './img/3.jpeg'
const { Title, Paragraph, Text, Link } = Typography;


class News00001 extends React.Component{
  render()  {return ( <div>
  <Typography className='text-type'>
    <Row>
      <Col span={15} offset={2}>
      <Title >奋战30天采样160万人次！248位浙一援沪核酸采样医疗一队队员，欢迎回家！</Title>
      </Col>
    </Row>
    <Row>
    <Col span={15} offset={2}>
      <Divider className='divider-type' />
    </Col>
   
    </Row>
    <Row>
      <Col  span={13} offset={2}>
      <Paragraph>
    “英雄凯旋，欢迎回家！”、“援沪天使，你们最美丽！”……
    </Paragraph>
    <Paragraph>
    4月28日，在连续奋战30天后，浙大一院援沪核酸采样医疗一队（由护理、医疗、检验、院感）248名队员平安凯旋。
    </Paragraph>
    <Paragraph>
    这一个月内，他们核酸采样160万人次，目前，还有303名“浙一人”仍奋战在上海疫情防控、重症患者救治一线。
    </Paragraph>
    <Image
      src={img1}
      className='img-type'
    />
    
    <Paragraph>
    4月28日下午1时许，几辆搭载着浙江大学医学院附属第一医院援沪核酸采样医疗一队248名队员的“浙A”牌大巴车缓缓驶入庆春院区南大门。
    30天前，他们星夜兼程、从“浙”里出发，开启援沪抗疫之路。如今，他们圆满完成任务，平安回家。
    4月13日，浙大一院援沪核酸采样医疗二队252名队员已经出发，加强援沪力量，并逐步接替一队的工作。
    </Paragraph>

    <Paragraph>
    浙大一院党委书记梁廷波携院领导班子成员，为凯旋的队员们举行了隆重而温馨的欢迎仪式。
    </Paragraph>
    <Image src={img2} className='img-type'/>
    <Paragraph>
    梁廷波书记动情地说，哪里有需要，哪里就有浙大一院的身影。
    经过30个昼夜的全力奋战，浙大一院由魏国庆副院长带队的援沪核酸采样医疗一队的勇士们，
    圆满完成任务、平安回家，以“一刻也不能停、一步也不能落、一天也耽误不起”的精神头跑出了浙一援沪加速度，
    时间长、任务重，却实现了零感染、打胜仗，为全力遏制上海疫情传播、早日实现“动态清零”作出重要贡献。
    </Paragraph>
    <Image src={img3} className='img-type'/>
    <Paragraph>
    这是一支特别能吃苦、特别能战斗、特别讲奉献的光荣队伍。
    252名队员在30天内，几乎每天从湖州驻地驱车140公里往返上海，披星戴月，连续作战，完成采样873440人次，
    为上海疫情防控工作取得阶段性成效作出了重要贡献。最近几天，他们又继续投入嘉兴海宁，杭州拱墅区、余杭区的支援工作，
    完成采样730095人次，共计1603535人次。
    </Paragraph>
      </Col>
    </Row>
    
  </Typography>
 </div>
);
  }
}

export default News00001;