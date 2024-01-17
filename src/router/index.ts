import { createRouter, RouteRecordRaw, createWebHashHistory } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("@/layout/index.vue"),
    redirect: "/index",
    children: [
      // 需要layout的页面
      {
        path: "index",
        name: "index",
        meta: {
          title: "index",
        },
        component: () => import("@/pages/index.vue"),
      },
    ],
  },
  // 不需要layout的页面
  // 替代vue2中的'*'通配符路径
  {
    path: "/login",
    name: "login",
    meta: {
      title: "登录",
    },
    component: () => import("@/pages/login/index.vue"),
  },
  {
    path: "/question/:id/:name",
    name: "question",
    meta: {
      title: "登录",
    },
    component: () => import("@/pages/question/index.vue"),
  },
  { path: "/:pathMatch(.*)*", redirect: "/" },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
