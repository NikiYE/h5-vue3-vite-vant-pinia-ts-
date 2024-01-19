<template>
  <van-cell style="background-color: #faf7fd;" title="分享" is-link @click="showShare = true" />
  <van-share-sheet v-model:show="showShare" title="立即分享给好友" :options="options" @select="onSelect" />
</template>
<script lang="ts" setup>

import { showToast, closeToast } from "vant";
import type { ToastOptions } from "vant";
// 分享
const showShare = ref(false);
const options = [
  { name: "微信", icon: "wechat" },
  { name: "微博", icon: "weibo" },
  { name: "复制链接", icon: "link" },
];

const onSelect = (option: { name: string | ToastOptions | undefined }) => {
  showToast(option.name);
  showShare.value = false;
};
</script>