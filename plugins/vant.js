// import Vue from 'vue'
// import { Button, Toast, Icon, Tab, List, Field } from 'vant'

// // 以下组件没有对应css文件，需独立引用，否则babel-plugin-component会报错
// import Tabs from 'vant/lib/tabs'

// const components = {
//   Tab,
//   Tabs,
//   List,
//   Field,
//   Button,
//   Toast,
//   Icon
// }

// Object.keys(components).forEach(key => {
//   Vue.use(components[key])
// })

import Vue from 'vue'
import Vant from 'vant';
import 'vant/lib/vant-css/index.css'

Vue.use(Vant)
