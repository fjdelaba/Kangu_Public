<template>
  <div>
    <button>
        <icon>{{ icon }}</icon>
        {{ text }}
        </button>
  </div>
</template>

<script>
export default {
  name: 'BotonMantenedor',
  props: {
    text,
    icon,
    link
  }
}
</script>

<style>

</style>