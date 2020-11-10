export function getRange() {
  let selObj = window.getSelection()
  let range = null
  selObj && (range = selObj.getRangeAt(0))
  return range
}

// 选择全部内容
export function selectAll() {
  const selection = window.getSelection()
  if(selection) {
    selection.removeAllRanges()
    let newRange = document.createRange()
    let editor = document.getElementById('dpEditor')
    if(editor) {
      newRange.selectNodeContents(editor)
      selection.addRange(newRange)
    }
  }
}

// 设置背景颜色
function  setBackColor(color?: string) {
  // 检测是否已经有被span元素包裹，是否已经有 background-color style
  // 1. 没有span标签包裹则添加span标签，添加style 背景色
  // 2. 有span包裹没有style 背景色
  // 3. 有span包裹有style 背景色 则更换值
  const selection = window.getSelection()

}
