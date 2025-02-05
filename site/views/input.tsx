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
import { defineComponent, reactive } from 'vue';
import BkInput from '@bkui-vue/input';
import { Search, InfoLine } from '@bkui-vue/icon';

export default defineComponent({
  setup() {
    const state = reactive({
      numberValue: 0,
      changeVal: '',
      inputValue: '',
      passwordVal: 'password',
    });

    function handleInputChange(val) {
      console.log('handleChange', val);
    }
    return () => (
      <div>
        <BkInput prefix="https://" style="margin: 10px 0" modelValue={state.changeVal}
          onChange={handleInputChange} placeholder="请输入" clearable />
        <BkInput style="margin: 10px 0"  v-model={state.numberValue} clearable max={100} min={0} step={2}
          precision={3} type="number" />
        <BkInput style="margin: 10px 0" maxlength={state.numberValue} v-model={state.inputValue} type="search" />
        <BkInput style="margin: 10px 0" type="url" suffix='@qq.com'/>
        <BkInput style="margin: 10px 0" v-model={state.passwordVal} clearable type="password" />
        <BkInput style="margin: 10px 0" readonly size="small">
          {{
            prefix: () => (
              <span style="display: block; align-self: center; font-size: 16px; padding-left: 10px; color: #c4c6cc;">
                  <Search />
              </span>
            ),
            suffix: () => (
              <span style="display: block; align-self: center; font-size: 16px; padding-right: 10px; color: #c4c6cc;">
                <InfoLine />
              </span>
            ),
          }}
        </BkInput>
        <BkInput style="margin: 10px 0" disabled size="large" />
      </div>
    );
  },
});
