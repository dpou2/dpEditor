import {getRange, selectAll} from './lib'

type Cmd =
    'bold'
    | 'italic'
    | 'underline'
    | 'foreColor'
    | 'backColor'
    | 'strikeThrough'
    | 'lineHeight'
    | 'formatBlock'
    | 'all'

function ExecCommand(cmd: Cmd, value?: string): boolean {
  console.log(cmd, value)
  // 所有命令前判断光标位置是否未动~

  let range = getRange()
  if (!range) {
    alert('未选中内容')
    return false
  }
  switch (cmd) {
    case "all":
      selectAll()
      break
    case "backColor":

  }
  return true
}


export default ExecCommand
