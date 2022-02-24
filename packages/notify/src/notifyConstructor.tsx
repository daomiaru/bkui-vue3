/*
* Tencent is pleased to support the open source community by making
* 蓝鲸智云PaaS平台社区版 (BlueKing PaaS Community Edition) available.
*
* Copyright (C) 2021 THL A29 Limited, a Tencent company.  All rights reserved.
*
* 蓝鲸智云PaaS平台社区版 (BlueKing PaaS Community Edition) is licensed under the MIT License.
*
* License for 蓝鲸智云PaaS平台社区版 (BlueKing PaaS Community Edition):
*
* ---------------------------------------------------
* Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
* documentation files (the "Software"), to deal in the Software without restriction, including without limitation
* the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and
* to permit persons to whom the Software is furnished to do so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of
* the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
* THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
* CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
* IN THE SOFTWARE.
*/

import { defineComponent, computed, ref, onMounted, onUnmounted, watch, Transition } from 'vue';
import { PropTypes, bkZIndexManager } from '@bkui-vue/shared';
import { Error, Close, Info, Warn, Success } from '@bkui-vue/icon';

const notifyProps = {
  id: PropTypes.string.def(''),
  title: PropTypes.string.def(''),
  message: PropTypes.string.def(''),
  theme: PropTypes.theme(['primary', 'warning', 'success', 'danger']).def('primary'),
  position: PropTypes.position().def('top-right'),
  delay: PropTypes.number.def(3000),
  offset: PropTypes.number.def(0),
  onClose: PropTypes.func,
};

export default defineComponent({
  name: 'Notify',
  props: notifyProps,
  emits: ['destory'],
  setup(props, { emit }) {
    const classNames = computed(() => [
      'bk-notify',
      `bk-notify-${props.theme}`,
    ]);
    const zIndex = bkZIndexManager.getMessageNextIndex();

    const horizontalClass = computed(() => (props.position.indexOf('right') > 1 ? 'right' : 'left'));

    const verticalProperty = computed(() => (props.position.startsWith('top') ? 'top' : 'bottom'));
    const styles = computed(() => ({
      [horizontalClass.value]: '10px',
      [verticalProperty.value]: `${props.offset}px`,
      zIndex,
    }));

    const visible = ref(false);

    let timer = null;
    const startTimer = () => {
      timer = setTimeout(() => {
        visible.value = false;
      }, props.delay);
    };

    const handleClose = () => {
      visible.value = false;
    };

    onMounted(() => {
      startTimer();
      visible.value = true;
    });

    onUnmounted(() => {
      clearTimeout(timer);
    });

    watch(visible, () => {
      if (!visible.value) {
        emit('destory', props.id);
      }
    });

    return {
      classNames,
      styles,
      visible,
      handleClose,
    };
  },
  render() {
    const renderIcon = () => {
      const iconMap = {
        primary: <Info></Info>,
        warning: <Warn></Warn>,
        success: <Success></Success>,
        danger: <Close></Close>,
      };
      return iconMap[this.theme];
    };

    return (
      <Transition name="bk-notify-fade">
        <div
          v-show={this.visible}
          class={this.classNames}
          style={this.styles}>
          <div class="bk-notify-content">
            <div class="bk-notify-icon">{renderIcon()}</div>
            {this.title ? <h3 class="bk-notify-content-header">{this.title}</h3> : ''}
            <div class="bk-notify-content-text">{this.message}</div>
          </div>
          <Error class="bk-notify-icon bk-notify-close" onClick={this.handleClose}></Error>
        </div>
      </Transition>
    );
  },
});