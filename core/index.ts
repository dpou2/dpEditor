// 获取元素 --- 元素使用id设置 `id = dpEditor`
const Editor = document.getElementById('dpEditor')
// 为元素添加可编辑属性

if(Editor) {
  Editor.setAttribute('contenteditable', 'true')
  Editor.setAttribute('spellcheck', 'false')
  Editor.setAttribute('style', "height: 300px; width: 80%; margin: 0 auto; border: 1px solid black; line-height: 1.6;padding: 6px;overflow: auto;")
  // paste(Editor)
}else {
  console.error('初始化编辑器错误')
}

function paste(target: HTMLElement) {
  target.addEventListener('paste', (event: ClipboardEvent) => {
    let parseContent = (event.clipboardData || (window as any).clipboardData).getData('text/plain')
    let parseContent0 = (event.clipboardData || (window as any).clipboardData).getData('text/html')
    console.log('复制的内容0是', parseContent0)
    console.log('复制的内容是', parseContent)
    debugger
    // 处理内容
    const selection = window.getSelection()
    // 如果页面新加载未有被点击的情况返回
    if(selection) {
      if(!selection.rangeCount) return false
      selection.deleteFromDocument()
      //
      console.log(selection.getRangeAt(0))
      event.preventDefault();
    }
  })
}
