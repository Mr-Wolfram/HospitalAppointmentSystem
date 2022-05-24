//
// class MyModal {
//     state={value:1111}
//
//     render(){
//         return <div>
//             <div>
//                 {this.props.data}
//                 <Button onClick={()=>{
//                     this.props.changeFatherStatus(param)
//                 }
//                 } />
//             </div>
//             <Modal
//                 title='预约挂号'
//                 visible={this.state.timeTableVisible}
//                 onOk={this.handleSearchModalOk}
//                 confirmLoading={this.state.confirmLoading}
//                 onCancel={this.handleSearchModalCancel}
//                 okText='确定'
//                 cancelText='取消'
//             >
//                 }
//         </div>
// }
//
//
//
//

// import { Modal } from 'antd';

// class MyModal {
//   state = {}
//   render() {
//     return <div>
//       <Modal
//         title='预约挂号'
//         visible={this.state.timeTableVisible}
//         onOk={this.handleSearchModalOk}
//         confirmLoading={this.state.confirmLoading}
//         onCancel={this.handleSearchModalCancel}
//         okText='确定'
//         cancelText='取消'
//       >
//         <span style={{ marginLeft: '30px' }}>
//           {this.tmpArray.map(r => this.generateIntroComponent(r))}
//         </span>
//         <Radio.Group defaultValue='0' buttonStyle='solid' onChange={this.selectOnChange} style={{ marginLeft: '30px', marginTop: '10px' }}>
//           <Space size={[20, 20]} wrap>
//             {this.state.numberOfQueue.map((item, index) => {
//               let startTime = 0;
//               if (index < 4) {
//                 startTime = index + 8;
//               }
//               else {
//                 startTime = index + 10;
//               }
//               if (item === 0) {
//                 return (
//                   <Radio.Button value={startTime} style={{ width: '120px', height: '60px' }} disabled><span>{startTime}:00-{startTime + 1}:00<br />当前空余{item}人</span></Radio.Button>
//                 )
//               }
//               else {
//                 return (
//                   <Radio.Button value={startTime} style={{ width: '120px', height: '60px' }}><span>{startTime}:00-{startTime + 1}:00<br />当前空余{item}人</span></Radio.Button>
//                 )
//               }
//             })}
//           </Space>
//         </Radio.Group>
//       </Modal>
//     </div>
//   }
// }

// export default MyModal;