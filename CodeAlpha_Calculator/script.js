let curr = '0', prev = '', oper = null;
const out = document.getElementById('main-output'), hist = document.getElementById('history');

function refresh() {
    out.innerText = curr;
    hist.innerText = oper ? `${prev} ${oper}` : '';
}

function pushNum(n) {
    if (n === '.' && curr.includes('.')) return;
    curr = (curr === '0' && n !== '.') ? n : curr + n;
    refresh();
}

function setOp(o) {
    if (curr === '') return;
    if (prev !== '') runResult();
    oper = o; prev = curr; curr = '';
    refresh();
}

function runResult() {
    let res;
    const a = parseFloat(prev), b = parseFloat(curr);
    if (isNaN(a) || isNaN(b)) return;
    switch(oper) {
        case '+': res = a + b; break;
        case '-': res = a - b; break;
        case '×': res = a * b; break;
        case '÷': res = b === 0 ? "Error" : a / b; break;
        default: return;
    }
    curr = res.toString(); oper = null; prev = '';
    refresh();
}

function resetCalc() { curr = '0'; prev = ''; oper = null; refresh(); }
function popDigit() { curr = curr.length > 1 ? curr.slice(0, -1) : '0'; refresh(); }

// 100% Working Keyboard Integration
window.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') pushNum(e.key);
    if (e.key === '.') pushNum('.');
    if (e.key === 'Enter' || e.key === '=') runResult();
    if (e.key === 'Backspace') popDigit(); // Backspace fix
    if (e.key === 'Escape') resetCalc();
    if (e.key === '+') setOp('+');
    if (e.key === '-') setOp('-');
    if (e.key === '*') setOp('×');
    if (e.key === '/') setOp('÷');
});