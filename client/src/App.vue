<template>
  <router-view :style="'direction: ' + $t('direction')" />
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App'
})
</script>
