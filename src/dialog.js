// 需要把元素渲染到组件之外，用 createPortal 把元素直接渲染到 document.body 下，为了防止函数组件每一次执行都触发 createPortal， 所以通过 useMemo 做性能优化。

// 因为需要渐变的动画效果，所以需要两个变量 modelShow / modelShowAync 来控制显示/隐藏，modelShow 让元素显示/隐藏，modelShowAync 控制动画执行。

// 当弹窗要显示的时候，要先设置 modelShow 让组件显示，然后用 setTimeout 调度让 modelShowAync 触发执行动画。
// 当弹窗要隐藏的时候，需要先让动画执行，所以先控制 modelShowAync ，然后通过控制 modelShow 元素隐藏，和上述流程相反。
// 用一个控制器 controlShow 来流畅执行更新任务。
import React, { useMemo, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

/* 控制弹窗隐藏以及动画效果 */
const controlShow = (f1, f2, value, timer) => {
  f1(value)
  return setTimeout(() => {
    f2(value)
  }, timer)
}
export default function Dialog(props) {
  const { width, visible, closeCb, onClose } = props
  /* 控制 modelShow 动画效果 */
  const [modelShow, setModelShow] = useState(visible)
  const [modelShowAync, setModelShowAync] = useState(visible)
  const renderChildren = useMemo(() => {
    /* 把元素渲染到组件之外的 document.body 上  */
    return ReactDOM.createPortal(
      <div style={{ display: modelShow ? 'block' : 'none' }} >
        <div className="model_container" style={{ opacity: modelShowAync ? 1 : 0 }}  >
          <div className="model_wrap" >
            <div style={{ width: width + 'px' }}  > {props.children} </div>
          </div>
        </div>
        <div className="model_container mast" onClick={() => onClose && onClose()} style={{ opacity: modelShowAync ? 0.6 : 0 }} />
      </div>,
      document.body
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modelShowAync, modelShow])
  useEffect(() => {
    let timer
    if (visible) {
      /* 打开弹窗，需要先让 */
      timer = controlShow(setModelShow, setModelShowAync, visible, 30)
    } else {
      timer = controlShow(setModelShowAync, setModelShow, visible, 1000)
    }
    return function () {
      timer && clearTimeout(timer)
    }
  }, [visible])
  /* 执行关闭弹窗后的回调函数 closeCb */
  useEffect(() => {
    !modelShow && typeof closeCb === 'function' && closeCb()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modelShow])
  return renderChildren
}