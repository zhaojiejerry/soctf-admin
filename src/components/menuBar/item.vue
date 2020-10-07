<script>
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  render(h, context) {
    const { icon, title } = context.props
    const vnodes = []

    if (icon) {
      vnodes.push(<i class={icon}></i>)
    }

    if (title) {
      // eslint-disable-next-line jsx-quotes
      vnodes.push(<span slot="title">{title}</span>)
    }

    // eslint-disable-next-line jsx-quotes
    vnodes.push(<em class="active-prefix"></em>)

    return vnodes
  }
}
</script>
