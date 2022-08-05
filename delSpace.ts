
export function replaceWhitespace(htmlStr: string): string {
    let stack: string[] = [];
    let res: string[] = [];
    for (let i = 0; i < htmlStr.length; ++i) {
        let ch = htmlStr[i];
        if (ch === '<') {
            stack.push('<');
        } else if (ch === '>' && stack[stack.length - 1] === '<') {
            stack.pop();
        }
        if (ch === ' ' && stack.length === 0) {
            ch = '&nbsp'
        }
        res.push(ch);
    }
    return res.join('');
}


// 输出结果 <body><div style="padding: 1px">12&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3</div></body>