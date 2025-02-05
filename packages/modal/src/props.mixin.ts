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

export const propsMixin = {
  isShow: {
    type: Boolean,
    default: false,
  },
  width: {
    type: [Number, String],
    default: '50%',
  },
  height: {
    type: [Number, String],
    default: '50%',
  },
  customClass: {
    type: [Array, String],
    default: '',
  },
  scrollable: {
    type: Boolean,
    default: true,
  },
  extCls: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: 'Header',
  },
  showMask: {
    type: Boolean,
    default: true,
  },
  quickClose: {
    type: Boolean,
    default: true,
  },
  beforeClose: {
    type: Function,
    default: () => true,
  },
  maxHeight: { // 内容区最大高度
    type: String,
    default: '',
  },
  transfer: { // 是否显示在body内（即与id#app同级），默认同级
    type: Boolean,
    default: false,
  },
  direction: {
    type: String,
    default: '',
  },
  animateType: { // 动画类型
    type: String,
    default: 'slide',
  },
};
