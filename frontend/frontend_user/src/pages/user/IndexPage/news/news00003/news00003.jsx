import React from 'react';
import { Typography, Divider} from 'antd';
import { render } from 'react-dom';
import { Statistic, Card,Row, Col } from 'antd';
import { Image } from 'antd';
import '../news.css'
const { Title, Paragraph, Text, Link } = Typography;


class News00003 extends React.Component{
  render()  {return ( <div>
  <Typography className='text-type'>
    <Row>
      <Col span={15} offset={5}>
      <Title>关于全国卫生系统先进集体先进工作者推荐对象公示的通告</Title>
      </Col>
    </Row>
    <Row>
    <Col span={15} offset={5}>
      <Divider className='divider-type' />
    </Col>

    </Row>
    <Row>
      <Col  span={13} offset={5}>
          <Paragraph>
          经省卫生系统评选表彰工作领导小组研究，拟推荐我院张三等5人为全国卫生系统先进集体和先进工作者，现予以公示，公示期七天。
          </Paragraph>
          <Paragraph>
            公示期间，如有不同意见，可以向省人事厅、省卫生厅反映。
          </Paragraph>
          <Paragraph>
            名单如下：
          </Paragraph>
        <Paragraph>
            张三 张华 王刚 李明 赵云
        </Paragraph>
      </Col>

    </Row>

  </Typography>
 </div>
);
  }
}

export default News00003;
