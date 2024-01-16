<template>
  <div>
    <button @click="onSubmit">登录</button>
  </div>
</template>
<script lang="ts" setup>
import Api from "@/api/user";
import debug from "@/utils/debug";
const route = useRoute();

// 进入登录页时获取debug参数
onMounted(() => {
  debug.config(route.query.debug);
});

import { useLoading } from "@/hooks/useLoading";

const { startLoading, stopLoading } = useLoading();

const loginInfo = {
  username: "admin",
  password: "password",
};
const onSubmit = async () => {
  startLoading();
  const { code, result, message } = await Api.login(loginInfo);
  stopLoading();
  // do something
};
</script>
