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

import { PropTypes, classes } from '@bkui-vue/shared';
import {
  computed,
  defineComponent,
  getCurrentInstance,
  inject,
  onBeforeMount,
  onBeforeUnmount,
  reactive,
  toRefs,
  watchEffect,
} from 'vue';
import { selectKey, optionGroupKey } from './common';

export default defineComponent({
  name: 'Option',
  props: {
    value: PropTypes.oneOfType([String, Number, Boolean]),
    label: PropTypes.oneOfType([String, Number]),
    disabled: PropTypes.bool.def(false),
  },
  setup(props) {
    const { proxy } = getCurrentInstance() as any;
    const states = reactive({
      visible: true,
    });

    const { disabled, label } = toRefs(props);
    const select = inject(selectKey, null);
    const group = inject(optionGroupKey, null);
    const selected = computed<boolean>(() => select.selectedOptions.has(proxy));
    const multiple = computed<boolean>(() => select?.props.multiple);
    watchEffect(() => {
      if (group?.groupCollapse) {
        states.visible = false;
      } else if (!select?.isRemoteSearch && select?.searchKey) {
        states.visible = toLowerCase(String(label.value))?.includes(toLowerCase(select?.searchKey));
      } else {
        states.visible = true;
      }
    });

    const toLowerCase = (value = '') => {
      if (!value) return value;

      return String(value).trim()
        .toLowerCase();
    };
    const handleOptionClick = () => {
      if (disabled.value) return;
      select?.handleOptionSelected(proxy);
    };

    onBeforeMount(() => {
      select?.register(proxy);
    });

    onBeforeUnmount(() => {
      select?.unregister(proxy);
    });

    return {
      ...toRefs(states),
      selected,
      multiple,
      handleOptionClick,
    };
  },
  render() {
    const selectItemClass = classes({
      'is-selected': this.selected,
      'is-disabled': this.disabled,
      'is-multiple': this.multiple,
      'is-hover': false,
      'bk-select-option': true,
    });
    return (
      <li v-show={this.visible} class={selectItemClass} onClick={this.handleOptionClick}>
        {this.$slots.default?.() ?? <span>{this.label}</span>}
      </li>
    );
  },
});
