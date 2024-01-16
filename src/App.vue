<script setup lang="ts">
import { onMounted } from "vue";

import debug from "@/utils/debug";

// 因为debug是存入localStorage中的，刷新页面会从localStorage取出，根据debug控制是否隐藏
onMounted(() => {
  debug.init();
});

//登录时在url中添加参数 debug=1 即可开启
// http://localhost:5173/#/login?debug=1

// 该隐藏开关只能在 login 页手动开启，debug 的值存储在 localStorage 中确保刷新页面不会丢失，回到 login 页 debug 被清除，需重新添加 debug=1 参数才能开启
</script>

<template>
  <router-view />
</template>

<style scoped></style>
