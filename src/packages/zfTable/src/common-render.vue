<script>
// vue JSX语法
export default {
    name: 'CommonRender',
    functional: true,
    props: {
        scope: Object,
        render: Function
    },
    render: (h, ctx) => {
        return ctx.props.render ? ctx.props.render(h, ctx.props.scope) : '' // VNode
    }
}

</script>
