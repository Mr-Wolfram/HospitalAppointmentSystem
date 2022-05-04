import React,{Component} from 'react';

import { Input, Col, Select, InputNumber, DatePicker, AutoComplete, Cascader } from 'antd';
import TableCard from './component/TableCard';
const Search = Input.Search;
const InputGroup = Input.Group;
const Option = Select.Option;
const options = [{
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [{
      value: 'hangzhou',
      label: 'Hangzhou',
      children: [{
        value: 'xihu',
        label: 'West Lake',
      }],
    }],
  }, {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [{
      value: 'nanjing',
      label: 'Nanjing',
      children: [{
        value: 'zhonghuamen',
        label: 'Zhong Hua Men',
      }],
    }],
  }];
class OrderManage extends Component {
    state = {
        dataSource: [],
      }
      handleChange = (value) => {
        this.setState({
          dataSource: !value || value.indexOf('@') >= 0 ? [] : [
            `${value}@gmail.com`,
            `${value}@163.com`,
            `${value}@qq.com`,
          ],
        });
      }
    render () {
        return (
            <div >
                搜索框,列表
                <div>
                    
                    <Search
                        placeholder="input search text"
                        style={{ width: 200 }}
                        onSearch={value => console.log(value)}
                    />
                <div>
                    <div>
                        <InputGroup size="large">
                        <Col span={4}>
                            <Input defaultValue="0571" />
                        </Col>
                        <Col span={8}>
                            <Input defaultValue="26888888" />
                        </Col>
                        </InputGroup>
                        <br />
                        <InputGroup compact>
                        <Input style={{ width: '20%' }} defaultValue="0571" />
                        <Input style={{ width: '30%' }} defaultValue="26888888" />
                        </InputGroup>
                        <br />
                        <InputGroup compact>
                        <Select defaultValue="Zhejiang">
                            <Option value="Zhejiang">Zhejiang</Option>
                            <Option value="Jiangsu">Jiangsu</Option>
                        </Select>
                        <Input style={{ width: '50%' }} defaultValue="Xihu District, Hangzhou" />
                        </InputGroup>
                        <br />
                        <InputGroup compact>
                        <Select defaultValue="Option1">
                            <Option value="Option1">Option1</Option>
                            <Option value="Option2">Option2</Option>
                        </Select>
                        <Input style={{ width: '50%' }} defaultValue="input content" />
                        <InputNumber />
                        </InputGroup>
                        <br />
                        <InputGroup compact>
                        <Input style={{ width: '50%' }} defaultValue="input content" />
                        <DatePicker />
                        </InputGroup>
                        <br />
                        <InputGroup compact>
                        <Select defaultValue="Option1-1">
                            <Option value="Option1-1">Option1-1</Option>
                            <Option value="Option1-2">Option1-2</Option>
                        </Select>
                        <Select defaultValue="Option2-2">
                            <Option value="Option2-1">Option2-1</Option>
                            <Option value="Option2-2">Option2-2</Option>
                        </Select>
                        </InputGroup>
                        <br />
                        <InputGroup compact>
                        <Select defaultValue="1">
                            <Option value="1">Between</Option>
                            <Option value="2">Except</Option>
                        </Select>
                        <Input style={{ width: 100, textAlign: 'center' }} placeholder="Minimum" />
                        <Input style={{ width: 24, borderLeft: 0, pointerEvents: 'none', backgroundColor: '#fff' }} placeholder="~" disabled />
                        <Input style={{ width: 100, textAlign: 'center', borderLeft: 0 }} placeholder="Maximum" />
                        </InputGroup>
                        <br />
                        <InputGroup compact>
                        <Select defaultValue="Sign Up">
                            <Option value="Sign Up">Sign Up</Option>
                            <Option value="Sign In">Sign In</Option>
                        </Select>
                        <AutoComplete
                            dataSource={this.state.dataSource}
                            style={{ width: 200 }}
                            onChange={this.handleChange}
                            placeholder="Email"
                        />
                        </InputGroup>
                        <br />
                        <InputGroup compact>
                        <Select style={{ width: '30%' }} defaultValue="Home">
                            <Option value="Home">Home</Option>
                            <Option value="Company">Company</Option>
                        </Select>
                        <Cascader style={{ width: '70%' }} options={options} placeholder="Select Address" />
                        </InputGroup>
                    </div>
                    <TableCard />
                    </div>
                    
                </div>
            </div>
        );
        }
}

export default OrderManage;