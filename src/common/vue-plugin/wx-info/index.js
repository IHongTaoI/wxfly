import infoComp from './index.vue';
import { mergeOptions } from './../helper/plugin_helper';
let $vm;
let watcher;

const plugin = {
  install(vue) {
    const InfoPage = vue.extend(infoComp);

    if (!$vm) {
      $vm = new InfoPage({
        el: document.createElement('div')
      });
      document.body.appendChild($vm.$el);
    }

    const option = {
      show(options = {}) {
        if (typeof options !== 'object')
          throw new Error('参数options不是一个有效的JSON');

        watcher && watcher();

        mergeOptions($vm, options);
        if (options.onHide) {
          watcher = $vm.$watch('show', val => {
            val === false && options.onHide && options.onHide($vm);
          });
        }
        $vm.show = true;
      },
      hide() {
        $vm.show = false;
      }
    };

    if (!vue.$wechat) {
      vue.$myplug = {
        info: option
      };
    } else {
      vue.$myplug.info = option;
    }

    vue.mixin({
      created: function() {
        this.$wechat = vue.$wechat;
      }
    });
  }
};

export default plugin;
export const install = plugin.install;
