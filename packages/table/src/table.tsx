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

import { computed, defineComponent, nextTick, onBeforeUnmount, onMounted, reactive, ref, SetupContext, watch } from 'vue';
import { classes, resolveClassName } from '@bkui-vue/shared';
import { Column, IColumnActive, tableProps, TablePropTypes } from './props';
import TableRender from './render';
import {
  resolveActiveColumns,
  resolveNumberOrStringToPix,
  resolvePropBorderToClassStr,
  resolveColumnWidth,
  observerResize,
  isPercentPixOrNumber } from './utils';
import VirtualRender from '@bkui-vue/virtual-render';

export default defineComponent({
  name: 'BkTable',
  props: tableProps,
  setup(props: TablePropTypes, ctx: SetupContext) {
    const activeCols = reactive(resolveActiveColumns(props));
    const colgroups = reactive(props.columns.map(col => ({ ...col, calcWidth: null })));
    let observerIns = null;
    const root = ref();
    const getActiveColumns = () => (props.columns || []).map((_column: Column, index: number) => ({
      index,
      active: activeCols.some((colIndex: number) => colIndex === index),
      _column,
    }));
    const reactiveProp = reactive({
      activeColumns: getActiveColumns(),
      scrollTranslateY: 0,
    });

    /** 表格外层容器样式 */
    const wrapperStyle = computed(() => ({
      // height: resolveNumberOrStringToPix(props.height),
      minHeight: resolveNumberOrStringToPix(props.minHeight, 'auto'),
    }));

    /** 表格外层容器样式 */
    const contentStyle = computed(() => {
      const resolveHeight = resolveNumberOrStringToPix(props.height);
      const resolveHeadHeight = props.showHead ? resolveNumberOrStringToPix(props.headHeight) : '0';
      const isAutoHeight = !isPercentPixOrNumber(props.height);

      return {
        display: 'block',
        ...(isAutoHeight ? { maxHeight: `calc(${resolveHeight} - ${resolveHeadHeight} - 2px)` }
          : { height: `calc(${resolveHeight} - ${resolveHeadHeight} - 2px)` }),
      };
    });

    watch(() => [props.activeColumn, props.columns], () => {
      nextTick(() => {
        reactiveProp.activeColumns = getActiveColumns();
        const cols = resolveActiveColumns(props);
        reactiveProp.activeColumns.forEach((col: IColumnActive, index: number) => {
          Object.assign(col, { active: cols.some((colIndex: number) => colIndex === index) });
        });
      });
    }, { deep: true });

    const tableRender = new TableRender(props, ctx, reactiveProp, colgroups);

    const tableClass = computed(() => (classes({
      [resolveClassName('table')]: true,
    }, resolvePropBorderToClassStr(props.border))));

    const headClass = classes({
      [resolveClassName('table-head')]: true,
    });

    const contentClass = classes({
      [resolveClassName('table-body')]: true,
    });

    const handleScrollChanged = (args: any[]) => {
      const pagination = args[1];
      reactiveProp.scrollTranslateY = pagination.translateY;
    };

    onMounted(() => {
      observerIns = observerResize(root.value, () => {
        resolveColumnWidth(root.value, colgroups, 20);
      }, 60, true);

      observerIns.start();
    });

    onBeforeUnmount(() => {
      observerIns.stop();
      observerIns = null;
    });

    ctx.expose({
      plugins: tableRender.plugins,
    });

    return () => <div class={tableClass.value} style={wrapperStyle.value} ref={root}>
      <div class={ headClass }>
        {
          props.showHead && tableRender.renderTableHeadSchema()
        }
      </div>
    <VirtualRender
      lineHeight={props.rowHeight}
      contentClassName={ contentClass }
      style={ contentStyle.value }
      list={props.data}
      onContentScroll={ handleScrollChanged }
      throttleDelay={0}
      enabled={props.virtualEnabled}>
        {
          {
            default: (scope: any) => tableRender.renderTableBodySchema(scope.data || props.data),
            afterContent: () => <div class={ resolveClassName('table-fixed') }></div>,
          }
        }
    </VirtualRender>
    </div>;
  },
});

