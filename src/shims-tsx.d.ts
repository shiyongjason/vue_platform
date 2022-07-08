import Vue, { VNode } from 'vue'
import { tableLabelItem } from './packages/zfTable/tableLabelItem'

declare global {
    namespace JSX {
        // tslint:disable no-empty-interface
        interface Element extends VNode {}
        // tslint:disable no-empty-interface
        interface ElementClass extends Vue {}
        interface IntrinsicElements {
            [elem: string]: any
        }
    }

    interface TableRenderParam<T = any> {
        row: T
        column: {
            /** Property name of the source data */
            property: string
            /** Label of the column */
            label: string
            [k: string]: any
        }
        $index: number
        [k: string]: any
    }
    type tableLabelProps<T extends {} = any> = Array<tableLabelItem<T>>
}
