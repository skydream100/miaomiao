import Vue from 'vue'
import MessageBox from '@/components/JS/MessageBox'
export var messageBox = (function(){ // 闭包
  var defaults = { // 默认值
    title: '',
    content: '',
    cancel: '',
    ok: '',
    handleCancel: null,
    handleOk: null
  };

  // 怎么让这个Js跟MessageBox下的index.Vue结合呢？
  var MyComponent = Vue.extend (MessageBox); // 通过extend方法，把MessageBox结合进去，得到里面的数据，再返回一个类

  return function (opts) { // 配置参数
    for(var attr in opts){
      defaults[attr] = opts[attr]; // 获取到defaults的值
    }
    var vm = new MyComponent ({ // 创建一个MyComponent类
      el: document.createElement('div'),
      data: { // 创建data数据
        title: defaults.title,
        content: defaults.content,
        cancel: defaults.cancel,
        ok: defaults.ok
      },
      methods : {
        handleCancel(){
          // 没有设置时，null，否则存在的话就走&&后面的。
          // console.log(defaults.handleCancel);  // 将bind--> call
          defaults.handleCancel && defaults.handleCancel.call(this); // 通过bind绑定this，才能拿到handleCancel的vm对象
          // 无论点击取消还是ok都要将这个弹窗移除掉。
          document.body.removeChild( vm.$el );
        },
        handleOk(){
          defaults.handleOk && defaults.handleOk.call(this); // 将bind改成call，才能触发，bind只是改变this指向，并不能触发
          document.body.removeChild( vm.$el );
        }
      }
    });
    document.body.appendChild( vm.$el ); // 将div添加到body中
  };
})();