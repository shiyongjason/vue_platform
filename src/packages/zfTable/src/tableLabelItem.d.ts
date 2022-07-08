import { ElTableColumn } from 'element-ui/types/table-column'
import { CreateElement } from 'vue'

interface TableRenderFunc<T> {
    (h: CreateElement, { row, $index }: TableRenderParam<T>): JSX.Element
}
export interface tableLabelItem<T> extends Partial<ElTableColumn> {
    /** 显示的标题 */
    label: string
    /** 对应列内容的字段名 */
    prop?: string
    /** 对应列的宽度 */
    width?: string
    /** 对应列的最小宽度，与 width 的区别是 width 是固定的，min-width 会把剩余宽度按比例分配给设置了 min-width 的列 */
    minWidth?: string
    /** 自定义列写法 */
    render?: TableRenderFunc<T>
    /**
     * 自定义插槽 [{prop: 'ceshi' , label: '测试插槽', slot : 'ceshi'}]
     * @template <template slot="ceshi" slot-scope="scope">
     */
    slot?: string
    /** 单元格单位 比如  10000元 */
    unit?: string
    /** 表头单位：比如   合计（元） */
    headerUnit?: string
    /** 金额、日期格式化 */
    displayAs?: 'YYYY-MM-DD HH:mm:ss' | 'YYYY-MM-DD HH:mm' | 'YYYY-MM-DD' | 'YYYY年MM月DD日 HH时mm分ss秒' | 'YYYY年MM月DD日' | 'money'
    /** 字典 Ex: [ { value : 1,label : '是' } ] 比如后端返回1，那表格展示中文'是'  */
    dicData?: { value: any; label: any }[]
    /** 该列是否可以排序，如果设置为 'custom'，则代表用户希望远程排序，需要监听 Table 的 sort-change 事件 */
    sortable?: 'custom' | boolean
    /** 列标题 Label 区域渲染使用的 */
    renderHeader?: (h: CreateElement, data: any) => VNode | string
    filters?: { text: any; value: any }[]
    /** 数据过滤使用的方法，如果是多选的筛选项，对每一条数据会执行多次，任意一次返回 true 就会显示 */
    filterMethod?: (value?: any, row?: any, column?: any) => any
    /** 多级表头 */
    children?: tableLabelItem<T>[]
    /** 是否隐藏该列 */
    isHidden?: boolean

    isUseCommonRenderHeader?: boolean
    // [k: string]: any // element 支持的api只要版本支持，这边都可以用。
}
