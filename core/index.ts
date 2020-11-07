// 获取元素 --- 元素使用id设置 `id = dpEditor`
const Editor = document.getElementById('dpEditor')
// 为元素添加可编辑属性

const headingDoOptions = ['H1', 'H2', 'H3', 'H4', 'normal']
const fontSizeDoOptions = [ '12px', '16px', '18px', '36px', '48px']
const fontStyleDoOptions = ['黑体', '宋体', '雅黑']
const rawHeightDoOptions = ['1', '1.2', '1.6', '2']
const listDoOptions = ["无序列表", "有序列表"] // 序列
const alignDoOptions = ['向左', "向右", '居中'] // 对齐方式


const editorOptions = ['italics', 'bold', 'underline', 'hangGao', 'heading', 'italics', 'align', 'fontSize', 'bgColor', 'color', 'fullScreen', 'url', 'list']

const testBtn = document.getElementById('testBtn')
if (testBtn) {
  testBtn.addEventListener('click', () => {
    testCmd('bold')
  })
}

if (Editor) {
  Editor.setAttribute('contenteditable', 'true')
  Editor.setAttribute('spellcheck', 'false')
  Editor.setAttribute('style', "height: 300px; width: 80%; margin: 10px auto 0 auto; border: 1px solid black; line-height: 1.6;overflow: auto;")
  // paste(Editor)
  // testCmd('bold')
  createBar(Editor, ['italics', 'bold', 'underline', 'hangGao', 'heading', 'italics', 'align', 'fontSize', 'bgColor', 'color', 'fullScreen', 'url', 'list'])
} else {
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
    if (selection) {
      if (!selection.rangeCount) return false
      selection.deleteFromDocument()
      //
      console.log(selection.getRangeAt(0))
      event.preventDefault();
    }
  })
}

function exec(cmd: string, value?: string) {
  // 校验命令
  if (cmd) {
    document.execCommand(cmd, false, value)
  }
}

//  测试功能函数
function testCmd(type: string) {
  if (type === 'bold') {
    exec(type)
  }
}

// 生成bar功能栏
function createBar(target: HTMLElement, options: Array<string> | string) {
  const bar = document.createElement('ul')
  bar.setAttribute('contenteditable', 'false')
  bar.classList.add('dpEditor_bar')
  if (typeof options === 'string' && options === 'all') {
    options = editorOptions || []
  }

  if (options.length === 0) {
    alert('请输入all 或者 ["option"]!')
    return
  }

  for (let i = 0; i < options.length; i++) {
    const li = document.createElement('li')
    let icon = getOptionsIcon(options[i])
    if (icon) {
      li.appendChild(icon)
      let ul2 = getSelectOptions(options[i])
      if (ul2) {
        li.appendChild(ul2)
      }
    }
    li.classList.add('dpEditor_bar_option')
    bar.appendChild(li)
  }
  target.appendChild(bar)
}

// 获取对应图标内容
function getOptionsIcon(type: string): any {
  let icon = document.createElement('i')
  icon.classList.add('iconfont', 'icon-' + type)
  return icon
}

// 获取菜单功能的子选项
function getSelectOptions(type: string) {
  let ul
  switch (type) {
    case 'heading':
      ul = createDoOptions(headingDoOptions, '标题文字')
      break
    case 'fontSize':
      ul = createDoOptions(fontSizeDoOptions, '字体大小')
      break
    case 'fontStyle':
      ul = createDoOptions(fontStyleDoOptions, '字体样式')
      break
    case 'hangGao':
      ul = createDoOptions(rawHeightDoOptions, '行高设置')
      break
    case 'list':
      ul = createDoOptions(listDoOptions, '列表设置')
      break
    case 'align':
      ul = createDoOptions(alignDoOptions, '对齐方式')
      break
  }
  return ul
}

function createDoOptions(type: Array<string>, topText: string) {
  let ul = document.createElement('ul')
  ul.classList.add('dpEditor_bar_option_do')
  let allLi = `<li  class="dpEditor_bar_option_do_list dpEditor_bar_option_do_list_header">${topText}</li>`
  for (let i = 0; i < type.length; i++) {
    allLi = allLi + `<li class="dpEditor_bar_option_do_list">${type[i]}</li>`
  }
  ul && ul.insertAdjacentHTML('afterbegin', allLi)
  return ul
}








