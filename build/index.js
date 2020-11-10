"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
// 获取元素 --- 元素使用id设置 `id = dpEditor`
var Editor = document.getElementById('dpEditor');
// 为元素添加可编辑属性
var headingDoOptions = ['H1', 'H2', 'H3', 'H4', 'normal'];
var fontSizeDoOptions = ['10px', '12px', '16px', '18px', '24px', '36px', '48px'];
var fontStyleDoOptions = ['黑体', '宋体', '雅黑'];
var rawHeightDoOptions = ['1', '1.2', '1.6', '2'];
var listDoOptions = ["insertUnorderedList", "insertOrderedList"]; // 序列
var alignDoOptions = ['justifyLeft', "justifyRight", 'justifyCenter']; // 对齐方式
var colorDoOptions = ['black', "gray", 'red', 'blue', 'green', 'orange'];
// bgColor - #222 #ccc #FF6666 #003399 #0099CC  #009966 #FF9900
var editorOptions = ['italic', 'bold', 'underline', 'hangGao', 'heading', 'align', 'fontSize', 'backColor', 'foreColor', 'fullScreen', 'url', 'list'];
// const testBtn = document.getElementById('testBtn')
// if (testBtn) {
//   testBtn.addEventListener('click', () => {
//     testCmd('bold')
//   })
// }
if (Editor) {
    Editor.setAttribute('contenteditable', 'true');
    Editor.setAttribute('spellcheck', 'false');
    if (Editor.parentElement) {
        Editor.parentElement.setAttribute('style', "position: relative; width: 80%;margin: 10px auto 0 auto;");
    }
    // Editor.setAttribute('style', "height: 300px; width: 80%; margin: 10px auto 0 auto; border: 1px solid black; line-height: 1.6;overflow: auto;")
    Editor.setAttribute('style', 'background: #eee; height: 100%;width: 100%; padding: 4px 10px; border: 1px solid #c9d0d0; border-top: none; line-height: 1.6;overflow: auto; min-height: 250px; '); // paste(Editor)
    // testCmd('bold')
    createBar(Editor, editorOptions);
    var p = document.createElement('p');
    Editor.appendChild(p);
}
else {
    console.error('初始化编辑器错误');
}
function paste(target) {
    target.addEventListener('paste', function (event) {
        var parseContent = (event.clipboardData || window.clipboardData).getData('text/plain');
        var parseContent0 = (event.clipboardData || window.clipboardData).getData('text/html');
        console.log('复制的内容0是', parseContent0);
        console.log('复制的内容是', parseContent);
        // 处理内容
        var selection = window.getSelection();
        // 如果页面新加载未有被点击的情况返回
        if (selection) {
            if (!selection.rangeCount)
                return false;
            selection.deleteFromDocument();
            //
            console.log(selection.getRangeAt(0));
            event.preventDefault();
        }
    });
}
function exec(cmd, value) {
    // 校验命令
    if (cmd) {
        console.log(document.execCommand(cmd, false, value));
    }
}
//  测试功能函数
function testCmd(type) {
    if (type === 'bold') {
        exec(type);
    }
}
// 生成bar功能栏
function createBar(target, options) {
    var bar = document.createElement('ul');
    bar.setAttribute('contenteditable', 'false');
    bar.classList.add('dpEditor_bar');
    if (typeof options === 'string' && options === 'all') {
        options = editorOptions || [];
    }
    if (options.length === 0) {
        alert('请输入all 或者 ["option"]!');
        return;
    }
    for (var i = 0; i < options.length; i++) {
        var li = document.createElement('li');
        var icon = getOptionsIcon(options[i]);
        if (icon) {
            icon.dataset.opType = options[i];
            li.dataset.opType = options[i];
            li.appendChild(icon);
            var ul2 = getSelectOptions(options[i]);
            if (ul2) {
                li.appendChild(ul2);
            }
        }
        li.classList.add('dpEditor_bar_option');
        // 绑定事件
        li.addEventListener('click', function (e) {
            var opType = e.target.dataset.opType;
            var opValue = e.target.dataset.opValue;
            if (opType) {
                if (opType === 'rowHeight') {
                    setLineHeight(target, opValue);
                }
                else {
                    opValue ? exec(opType, opValue) : exec(opType, null);
                }
            }
            else {
                alert('不是有效的操作');
            }
        });
        bar.appendChild(li);
    }
    if (target.parentElement) {
        target.parentElement.prepend(bar);
    }
}
// 设置行高
function setLineHeight(target, lh) {
    target.classList.remove('line-height-10', 'line-height-20', 'line-height-12', 'line-height-16');
    target.classList.add("line-height-" + Number(lh) * 10);
}
// 设置加粗
function setBold() {
}
// 获取对应图标内容
function getOptionsIcon(type) {
    var icon = document.createElement('i');
    icon.classList.add('iconfont', 'icon-' + type);
    return icon;
}
// 获取菜单功能的子选项
function getSelectOptions(type) {
    var ul;
    switch (type) {
        case 'heading':
            ul = createDoOptions(headingDoOptions, '标题文字', 'formatBlock');
            break;
        case 'fontSize':
            ul = createDoOptions(fontSizeDoOptions, '字体大小', 'fontSize');
            break;
        case 'fontStyle':
            ul = createDoOptions(fontStyleDoOptions, '字体样式', 'fontStyle');
            break;
        case 'hangGao':
            ul = createDoOptions(rawHeightDoOptions, '行高设置', 'rowHeight');
            break;
        case 'list':
            ul = createDoOptions(listDoOptions, '列表设置', 'list');
            break;
        case 'align':
            ul = createDoOptions(__spreadArrays(alignDoOptions), '对齐方式', 'align');
            break;
        case 'backColor':
            ul = createDoOptions(colorDoOptions, '背景颜色', 'backColor');
            break;
        case 'foreColor':
            ul = createDoOptions(colorDoOptions, '文字颜色', 'foreColor');
            break;
    }
    return ul;
}
function createDoOptions(type, topText, op) {
    var ul = document.createElement('ul');
    ul.classList.add('dpEditor_bar_option_do');
    var allLi = "<li class=\"dpEditor_bar_option_do_list dpEditor_bar_option_do_list_header\">" + topText + "</li>";
    for (var i = 0; i < type.length; i++) {
        var content = getChinaText(type[i]);
        var colorType = (op === 'foreColor' || op === 'backColor') ? op : '';
        var icon = '';
        var newValue = switchValue(op, type[i]);
        if (colorType) {
            icon = "<i class=\"iconfont icon-" + colorType + "\"  data-op-type=" + op + "  data-op-value=" + (newValue ? newValue : type[i]) + "  style=\"color: " + type[i] + ";\">&nbsp" + content + "</i>";
        }
        if (op === 'align' || op.indexOf('justify') > -1) {
            op = type[i];
        }
        allLi = allLi + ("<li  data-op-type=" + op + "  data-op-value=" + (newValue ? newValue : type[i]) + "   class=\"dpEditor_bar_option_do_list\" id=\"icon_id_i_" + type[i] + "\">" + (colorType ? icon : content) + "</li>");
    }
    // ul && ul.insertAdjacentHTML('afterbegin', allLi)
    ul.innerHTML = allLi;
    console.log(ul);
    return ul;
}
function switchValue(type, value) {
    if (type === 'fontSize') {
        switch (value) {
            case '10px':
                return '1';
            case '12px':
                return '2';
            case '16px':
                return '3';
            case '18px':
                return '4';
            case '24px':
                return '6';
            case '36px':
                return '6';
            case '48px':
                return '7';
            default:
                return '';
        }
    }
    else {
        return '';
    }
}
function getChinaText(types) {
    var i = types;
    switch (types) {
        case 'justifyLeft':
            i = '向左';
            break;
        case 'justifyRight':
            i = '向右';
            break;
        case 'justifyCenter':
            i = '居中';
            break;
        case 'insertUnorderedList':
            i = '无序列表';
            break;
        case 'insertOrderedList':
            i = '有序列表';
            break;
        case 'black':
            i = '黑色';
            break;
        case 'gray':
            i = '灰色';
            break;
        case 'red':
            i = '红色';
            break;
        case 'blue':
            i = '蓝色';
            break;
        case 'lightBlue':
            i = '浅蓝';
            break;
        case 'green':
            i = '绿色';
            break;
        case 'orange':
            i = '橙色';
            break;
    }
    return i;
}
