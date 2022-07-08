<template>
    <div>
        <vue-markdown>{{msg}}</vue-markdown>
    </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import Specification from './Index.md'
import Prism from 'prismjs'
export default {
    name: 'specification',
    components: {
        VueMarkdown
    },
    data () {
        return {
            msg: Specification
        }
    },
    mounted () {
        Prism.highlightAll()
    }
}
</script>

<style lang="scss" scoped>

</style>
