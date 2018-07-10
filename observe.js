class Observe {
    constructor(data) {
        this.walk(data);
    }

    walk(data) {
        if(!data||typeof data !== 'object') {
            return;
        }
        for(let key in data) {
            if(typeof data[key] == 'object') {
                this.walk(data[key])
            }
            this.define(data,key,data[key]);
        }
    }

    define(obj,key,val) {
        let that = this;
        let dep = new Dep();
        Object.defineProperty(obj,key,{
            enumerable:true,
            configurable:true,
            get(){
                Dep.target && dep.addsub(Dep.target);
                return val;
            },
            set(newValue){
                if(newValue !== val){
                    val = newValue;
                    typeof newValue == 'object'&&that.observe(newValue);
                    dep.notify();
                }
            }
        });
    }
}