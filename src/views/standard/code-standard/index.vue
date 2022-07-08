<template>
    <div class="main-page-body">
        <frontend/>
    </div>
</template>

<script>
import Prism from 'prismjs'
import frontend from './index.md'

export default {
    name: 'Code-standard',
    components: {
        frontend
    },
    data () {
        return{}
    },
    mounted () {
        Prism.highlightAll()
    }
}
</script>

<style lang="scss">
p {
    margin: 10px 0;
}
ol {
    padding: 10px 20px;
}
</style>
