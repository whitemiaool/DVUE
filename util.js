function isEle(e) {
    return e&&e.nodeType == 1
}
function isAttr(e) {
    return e&&e.nodeType == 2
}
function isText(e) {
    return e&&e.nodeType == 3
}

function getvmdata(key,vm) {
    try{
        let expr = key.trim().split('.');
        return expr.reduce((pre,next)=>{
            return pre[next];
        },vm.$data);
    } catch(e) {
        return undefined;
    }
}
