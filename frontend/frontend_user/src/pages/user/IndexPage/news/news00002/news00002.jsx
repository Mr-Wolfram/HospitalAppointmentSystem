import React from 'react';
import { Typography, Divider} from 'antd';
import { render } from 'react-dom';
import { Statistic, Card,Row, Col } from 'antd';
import { Image } from 'antd';
import '../news.css'
import NewsHead from '../newsHead'

const { Title, Paragraph, Text, Link } = Typography;


class News00002 extends React.Component{
  render()  {return ( <div>
    <NewsHead/>
    <Divider/>
  <Typography className='text-type'>
    <Row>
      <Col span={15} offset={2}>
      <Title>第二党支部召开2020年度党员领导干部民主生活会</Title>
      </Col>
    </Row>
    <Row className='author-type'>
      <Col >
      <p >部门：行政部&nbsp;&nbsp;&nbsp;&nbsp; 日期：2022-06-07 &nbsp;&nbsp;&nbsp;&nbsp; 点击次数：21 &nbsp;&nbsp;&nbsp;&nbsp;</p>
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
            2020年12月9日晚间，我院第二党支部于A栋101会议室召开本年度党员领导干部民主生活会。
        </Paragraph>
        <Paragraph>
            会上，支部书记通报了2020年度领导干部民主生活会整改措施落实情况，
            本次民主生活会准备情况和征求意见情况，代表局领导班子作了对照检查，
            并带头作个人对照检查，主动接受班子成员的批评。随后，
            班子成员逐一进行个人对照检查，相互间开展了严肃认真的批评。
            大家紧扣2020年度党员领导干部民主生活会主题，
            坚持贯彻整风精神，勇于自我革命，严肃认真开展批评与自我批评。
            相互间批评出于公心、直截了当、开诚布公，达到了统一思想、增进团结、进一步提升班子凝聚力、战斗力的目的。
        </Paragraph>
      </Col>
    </Row>
    
  </Typography>
 </div>
);
  }
}

export default News00002;