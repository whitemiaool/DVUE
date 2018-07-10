function Dvue(option) {
    this.$el   = option.el;
    this.$data = option.data;
    this.$root = document.querySelector(this.$el);
    if(this.$root) {
        new Observe(this.$data);
        new Compile(this.$el,this)
    }
}