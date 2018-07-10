const mus = /\{\{([^}]+)\}\}/g;
const direc = /^v-(.+)/

let model2node = {
    text(node,cp,vm) {
        if(mus.test(node.textContent)) {
            node.textContent = node.textContent.replace(mus,(str,key)=>{
                new Watch(vm,key,()=>{this.updatetext(node,getvmdata(key,vm))});
                return getvmdata(key,vm);
            })
        }
    },
    updatetext(n,v) {
        n.textContent = v;
    },
    model(node,key,vm) {
        new Watch(vm,key,()=>{this.updatemodel(node,getvmdata(key,vm))})
        node.addEventListener('input',(e)=>{
            this.setvuedata(vm,key,e.target.value);
        })
        this.updatemodel(node,getvmdata(key,vm));
    },
    updatemodel(n,v) {
        if(typeof v=='object') {
            console.error('model value should not an object');
        }
        n.value = v;
    },
    setvuedata(vm,expr,value) { 
        expr = expr.split('.');
        return expr.reduce((pre,next,currentIndex)=>{
            if (currentIndex === expr.length-1){
                return pre[next] = value;
            }
            return pre[next];
        },vm.$data);
    }
}

class Compile{
    constructor(el,vm) {
        this.el = isEle(el)?el:document.querySelector(el);
        this.vm = vm;
        if(!el) return;
        let frag = this.pushFragment(this.el);
        this.compile(frag);
        this.el.appendChild(frag);
    }
    compile(f) {
        let c = f.childNodes;
        c     = Array.prototype.slice.call(c);
        for(let i=0;i<c.length;i++) {
            if(isEle(c[i])) {
                this.compiledirective(c[i]);
                this.compile(c[i])
            } else if(isText(c[i])) {
                model2node.text(c[i],this,this.vm)
            }
        }
    }

    compiledirective(node) {
        let attrs = node.attributes;
        for(let i=0;i<attrs.length;i++) {
            let key = attrs[i].name;
            if(direc.test(key)) {
                let d = attrs[i].value;
                model2node[key.split('-')[1]](node,d,this.vm)
            }
        }
    }

    ctext(n) {
        if(mus.test(n.textContent)) {
            model2node(n,this,this.vm)
        }
    }

    pushFragment(node) {
        let f = document.createDocumentFragment();
        while(node.firstChild) {
            f.appendChild(node.firstChild)
        }
        return f;
    }
    
}
