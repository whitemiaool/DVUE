class Dep {
    constructor() {
        this.subs = new Set();
    }

    addsub(sub) {
        this.subs.add(sub);
    }

    rmsub(sub) {
        this.subs.delete(sub)
    }

    notify () { 
        for (let sub of this.subs) {
            sub.update();
        }
    }
}
Dep.target = null;

