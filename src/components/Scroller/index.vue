<template>
  <div class="wrapper" ref="wrapper">
      <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
export default {
    name: 'Scroller',
    // 父子通信,子组件通过props接收父组件传来的值
    props : {
        handleToScroll: {
            type: Function,
            default: function(){}
        },
        handleToTouchEnd : {
            type: Function,
            default: function(){}
        }
    },
    // 将所有通用的功能都封装起来，只需要提供对外的接口，其他的组件直接调用共用组件。
    mounted () {
        var scroll = new BScroll( this.$refs.wrapper , {
            tap: true,
            probeType: 1
        });
        // 将scroll添加成全局属性
        this.scroll = scroll;
        // 将pos回调出去
        scroll.on('scroll',(pos) => {
            this.handleToScroll(pos);
        });
        scroll.on('touchEnd',(pos) => {
            this.handleToTouchEnd(pos);
        });
    },
    methods : {
        toScrollTop(y){ // 回调函数
            // 会接收到父组件city 传过来y的值
            // scrollTo是better-scroll的方法
            this.scroll.scrollTo(0,y);
        }
    }
}
</script>

<style scoped>
.wrapper{ height: 100%;}
</style>