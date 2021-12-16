<template>
  <component :is="iconComponent"/>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: true
    }
  },
  computed: {
    iconComponent () {
      return () => import('@/assets/images/' + this.icon + '.svg?inline')
    }
  }
}
</script>