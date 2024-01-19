<template>
  <van-popup v-model:show="show" position="bottom" closeable :style="{ height: '70%' }" @click-overlay="onClickOverlay"
    @click-close-icon="onClickCloseIcon">
    <div class="success">
      <div class="wrap">
        <van-icon name="checked" />
        <p class="tip">恭喜您,填报成功!</p>
        <van-button plain icon="plus" type="primary" block @click="updateFun">为他人填报</van-button>
      </div>
    </div>
  </van-popup>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { showToast } from 'vant';

const emit = defineEmits()
const props = defineProps({
  showPopup: Boolean
})
const show = ref(false);

watch(() => props.showPopup, newValue => {
  console.log(props.showPopup, newValue)
  show.value = props.showPopup  // 子组件发送
})



const onClickOverlay = () => {
  emit('showPopup', false)
};
const onClickCloseIcon = () => {
  emit('showPopup', false)
};

import { inject } from 'vue';
const reload: Function | undefined = inject("reload");
const updateFun = () => {
  if (reload) reload();
}

</script>
<style lang="scss" scoped>
.success {
  padding: 30px;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  text-align: center;

  .wrap {}

  .van-icon {
    font-size: 80px;
    color: var(--color-main);
    margin: 0 50px 50px;
  }
}

.tip {
  font-size: 38px;
  margin-bottom: 30px;
}
</style>