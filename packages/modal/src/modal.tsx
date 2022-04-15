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

import { defineComponent } from 'vue';
import { bkPopIndexManager } from '@bkui-vue/shared';
import { propsMixin } from './props.mixin';

export default defineComponent({
  name: 'Modal',
  props: {
    ...propsMixin,
  },
  data() {
    return {
      visible: false,
    };
  },
  computed: {
    dialogWidth(): String | Number {
      return /^\d+$/.test(`${this.width}`) ? `${this.width}px` : this.width;
    },

    dialogHeight(): String | Number {
      return /^\d+$/.test(`${this.height}`) ? `${this.height}px` : this.height;
    },

    compStyle(): any {
      return {
        width: this.dialogWidth,
        height: this.dialogHeight,
        display: this.visible ? 'inherit' : 'none',
      };
    },
  },
  watch: {
    isShow: {
      handler(val: boolean) {
        this.visible = val;
      },
    },
    visible(val: boolean) {
      if (val) {
        this.$nextTick(() => {
          const hideMaskStyle = {
            'background-color': 'rgba(0,0,0,0)',
          };
          const appendStyle = this.showMask ? {} : hideMaskStyle;
          bkPopIndexManager.show(this.$el, this.showMask, appendStyle, this.transfer);
          this.$emit('shown');
        });
      } else {
        bkPopIndexManager.hide(this.$el, this.transfer);
        this.$emit('hidden');
      }
    },
  },
  beforeUnmount() {
    bkPopIndexManager.hide(this.$el);
  },
  render() {
    const maxHeight = this.maxHeight ? { maxHeight: this.maxHeight } : {};
    return (
      <div class={['bk-modal-wrapper', ...this.customClass]} style={this.compStyle}>
        {this.isShow ? (
            <div className="bk-modal-body">
              <div className="bk-modal-header">
                {this.$slots.header?.() ?? ''}
              </div>
              <div className="bk-modal-content" style={{ ...maxHeight }}>
                {this.$slots.default?.() ?? ''}
              </div>
              <div className="bk-modal-footer">
                {this.$slots.footer?.() ?? ''}
              </div>
            </div>
        ) : (
          ''
        )}
      </div>
    );
  },
});
