import { defineComponent, h } from 'vue'

export default defineComponent({
  props: {
    tag: {
      type: String,
      default: 'a'
    },
    to: {
      type: String,
      required: true
    }
  },
  setup(props, { slots }) {
    return () => {
      let comProps

      if (props.tag === 'a') {
        comProps = {
          href: `#${props.to}`
        }
      } else {
        comProps = {
          onClick: () => {
            window.location.href = window.location.origin + '/#' + props.to
          }
        }
      }

      return h(props.tag, comProps, slots.default())
    }
  }
})
