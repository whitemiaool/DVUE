class Watch{
    constructor(vm,key,cb) {
        this.vm = vm;
        this.key = key;
        this.cb = cb;
        this.oldvlue = this.setAgetDep();
    }
    getDepValue() {
        try{
            let expr = this.key.trim().split('.');
            return expr.reduce((pre,next)=>{
                return pre[next];
            },this.vm.$data);
        } catch(e) {
            return undefined;
        }
    }
    setAgetDep() {
        Dep.target = this;
        let oldv = this.getDepValue();
        Dep.target = null;
        return oldv;
    }
    update() {
        let newv = this.getDepValue();
        if(!(newv === this.oldvlue)) {
            this.cb&&this.cb(newv);
        }
        this.oldvlue = newv;
    }
}