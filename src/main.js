import Vue from "vue";
import Router from "vue-router";
import Axios from "axios";
import VueLazyload from "vue-lazyload";
import store from "./store";

import App from "./App";
import find from "./components/find/find.vue";
import play from "./components/play/play.vue";
Vue.use(VueLazyload, {
  loading: require("./components/default.png")
});

// 页面懒加载，只有点击的时候才会加载
const user = resolve => {
  import("./components/user/user.vue").then(module => {
    resolve(module);
  });
};
const bangdan = resolve => {
  import("./components/bangdan/bangdan.vue").then(module => {
    resolve(module);
  });
};
const albumDetail = resolve => {
  import("./components/detail-list/album-detail.vue").then(module => {
    resolve(module);
  });
};
const rankDetail = resolve => {
  import("./components/detail-list/rank-detail.vue").then(module => {
    resolve(module);
  });
};
const singerDetail = resolve => {
  import("./components/detail-list/singer-detail.vue").then(module => {
    resolve(module);
  });
};

Vue.config.productionTip = false;

Vue.use(Router);
Vue.prototype.$ajax = Axios;
/* eslint-disable no-new */

// 页面路由
const routes = [
  {
    path: "/user",
    component: user
  },
  {
    path: "/find",
    component: find
  },
  {
    path: "/bangdan",
    component: bangdan
  },
  {
    path: "/albumDetail",
    component: albumDetail,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  {
    path: "/singerDetail",
    component: singerDetail,
    meta: {
      keepAlive: true,
      isBack: false
    }
  },
  {
    path: "/rankDetail",
    component: rankDetail,
    meta: {
      keepAlive: true,
      isBack: false
    }
  }
];

const router = new Router({
  routes: routes
});

// 默认页
router.push("/find");

const app = new Vue({
  router,
  store,
  template: "<App/>",
  components: {
    App
  }
}).$mount("#app");
