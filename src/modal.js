// Modal 组件的设计实际很简单，就是接收上述的 props 配置，然后分配给 Top， Foot， Content 等每个部分。
// 这里通过 Dialog 组件，来实现 Modal 的动态显示/隐藏，增加动画效果。
// 绑定确定 onOk ，取消 onCancel ，关闭 onClose 等回调函数。
// 通过 PureComponent 做性能优化。
import Dialog from './dialog'
import React from 'react';

class Modal extends React.PureComponent {
  /* 渲染底部按钮 */
  renderFooter = () => {
    const { onOk, onCancel, cancelText, okText, footer } = this.props
    /* 触发 onOk / onCancel 回调  */
    if (footer && React.isValidElement(footer)) return footer
    return <div className="model_bottom" >
      <div className="model_btn_box" >
        <button className="searchbtn" onClick={(e) => { onOk && onOk(e) }} >{okText || '确定'}</button>
        <button className="concellbtn" onClick={(e) => { onCancel && onCancel(e) }} >{cancelText || '取消'}</button>
      </div>
    </div>
  }

  /* 渲染顶部 */
  renderTop = () => {
    const { title, onClose } = this.props
    return <div className="model_top" >
      <p>{title}</p>
      <span className="model_top_close" onClick={() => onClose && onClose()} >x</span>
    </div>
  }

  /* 渲染弹窗内容 */
  renderContent = () => {
    const { content, children } = this.props
    console.log('content', content)
    console.log('children', children)
    return React.isValidElement(content) ? content
      : children ? children : null
  }
  render() {
    const { visible, width = 500, closeCb, onClose } = this.props
    return <Dialog
      closeCb={closeCb}
      onClose={onClose}
      visible={visible}
      width={width}
    >
      {this.renderTop()}
      {this.renderContent()}
      {this.renderFooter()}
    </Dialog>
  }
}

export default Modal