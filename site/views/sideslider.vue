<template>
  <div>
    <button @click="handleOpenSlider">
      测试
    </button>
    <Sideslider
      v-model:isShow="isShow"
      direction="right"
      width="500"
      title="我是标题123"
      ext-cls="custom-slider"
      :before-close="handleCloseBefore"
      :show-mask="true"
      :scrollable="true"
      :quick-close="true"
      @hidden="handleHidden"
      @shown="handleShown"
    >
      <template #footer>
        <div>
          我是尾部asjdjas
        </div>
      </template>
      <template #default>
        <div style="height: 1200px;width: 80px;">
          我是内容
        </div>
      </template>
    </Sideslider>
  </div>
</template>

<script lang="ts">
import  { ref } from 'vue';
import Sideslider from '@bkui-vue/sideslider';
export default {
  name: 'Sideslider1',
  components: {
    Sideslider,
  },
  setup() {
    const isShow = ref(false);
    const handleOpenSlider = () => {
      isShow.value = !isShow.value;
    };
    // const sleep = ms => new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve(true);
    //   }, ms);
    // });
    const handleCloseBefore = async () => {
      console.log('关闭前触发');
      // await sleep(3000);
      return true;
    };
    const handleHidden = () => {
      console.log('关闭后触发');
    };
    const handleShown = () => {
      console.log('显示后触发');
    };
    return {
      handleOpenSlider,
      handleCloseBefore,
      handleHidden,
      handleShown,
      isShow,
    };
  },
};
</script>
